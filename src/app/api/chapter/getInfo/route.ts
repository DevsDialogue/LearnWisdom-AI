import { prisma } from "@/lib/db";
import { strict_output } from "@/lib/gpt";
import {
  getQuestionsFromTranscript,
  getTranscript,
  searchYoutube,
} from "@/lib/youtube";
import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";

// Validate the request body using Zod
const bodyParser = z.object({
  chapterId: z.string(),
});

export async function POST(req: Request) {
  try {
    // Ensure database connection
    await prisma.$connect();

    const body = await req.json();
    const { chapterId } = bodyParser.parse(body);

    // Fetch the chapter with validation
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
    });

    if (!chapter) {
      return NextResponse.json(
        {
          success: false,
          error: "Chapter not found",
          details: `No chapter found with ID: ${chapterId}`,
        },
        { status: 404 }
      );
    }

    // Search YouTube and fetch the transcript
    const videoId = await searchYoutube(chapter.youtubeSearchQuery);
    if (!videoId) {
      return NextResponse.json(
        {
          success: false,
          error: "YouTube video not found",
          details: `No video found for query: ${chapter.youtubeSearchQuery}`,
        },
        { status: 404 }
      );
    }

    // Get and process transcript
    let transcript = await getTranscript(videoId);
    const maxLength = 500;

    if (!transcript) {
      return NextResponse.json(
        {
          success: false,
          error: "Transcript not found",
          details: `No transcript available for video ID: ${videoId}`,
        },
        { status: 400 }
      );
    }

    // Truncate transcript if necessary
    transcript = transcript.split(" ").slice(0, maxLength).join(" ");

    try {
      // Generate summary using AI
      const aiResponse = await strict_output(
        "You are an AI capable of summarising a YouTube transcript",
        `Summarize in 250 words or less without including unrelated topics or sponsors. \n${transcript}`,
        { summary: "summary of the transcript" }
      );

      const { summary } = aiResponse as { summary: string };

      // Generate questions from the transcript
      const questions = await getQuestionsFromTranscript(
        transcript,
        chapter.name
      );

      if (!questions || questions.length === 0) {
        throw new Error("Failed to generate questions from transcript");
      }

      // Begin database transaction
      await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        // Create questions in the database
        await tx.question.createMany({
          data: questions.map((question) => {
            let options = [
              question.answer,
              question.option1,
              question.option2,
              question.option3,
            ];
            options = options.sort(() => Math.random() - 0.5); // Shuffle options
            return {
              question: question.question,
              answer: question.answer,
              options: JSON.stringify(options),
              chapterId: chapterId,
            };
          }),
        });

        // Update the chapter with video ID and summary
        await tx.chapter.update({
          where: { id: chapterId },
          data: {
            videoId,
            summary,
          },
        });
      });

      return NextResponse.json({
        success: true,
        data: {
          videoId,
          summary,
          questionCount: questions.length,
        },
      });
    } catch (aiError) {
      console.error("AI Processing Error:", aiError);
      return NextResponse.json(
        {
          success: false,
          error: "AI processing failed",
          details:
            process.env.NODE_ENV === "development"
              ? String(aiError)
              : undefined,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in POST /api/chapter/getInfo:", error);

    // Log database URL format (without credentials) in development
    if (process.env.NODE_ENV === "development" && process.env.DATABASE_URL) {
      const sanitizedUrl = process.env.DATABASE_URL.replace(
        /(:\/\/)([^:]+):([^@]+)@/,
        "$1[username]:[password]@"
      );
      console.log("Database URL format:", sanitizedUrl);
    }

    // Handle specific Prisma errors
    if (error instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed",
          details:
            process.env.NODE_ENV === "development" ? error.message : undefined,
        },
        { status: 500 }
      );
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          success: false,
          error: "Database operation failed",
          code: error.code,
          details:
            process.env.NODE_ENV === "development" ? error.message : undefined,
        },
        { status: 500 }
      );
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    // Generic error handling
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  } finally {
    // Always disconnect from the database
    await prisma.$disconnect();
  }
}
