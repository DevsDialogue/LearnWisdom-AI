import { prisma } from "@/lib/db";
import { strict_output } from "@/lib/gpt";
import {
  getQuestionsFromTranscript,
  getTranscript,
  searchYoutube,
} from "@/lib/youtube";
import { NextResponse } from "next/server";
import { z } from "zod";

// Validate the request body using Zod
const bodyParser = z.object({
  chapterId: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { chapterId } = bodyParser.parse(body);

    // Fetch the chapter
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
    });

    if (!chapter) {
      return NextResponse.json(
        {
          success: false,
          error: "Chapter not found",
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
        },
        { status: 404 }
      );
    }

    let transcript = await getTranscript(videoId);
    const maxLength = 500;

    if (transcript) {
      transcript = transcript.split(" ").slice(0, maxLength).join(" ");
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Transcript not found or empty",
        },
        { status: 400 }
      );
    }

    // Summarize the transcript
    const aiResponse = await strict_output(
      "You are an AI capable of summarising a YouTube transcript",
      `Summarize in 250 words or less without including unrelated topics or sponsors. \n${transcript}`,
      { summary: "summary of the transcript" }
    );

    const { summary }: { summary: string } = aiResponse;

    // Generate questions from the transcript
    const questions = await getQuestionsFromTranscript(
      transcript,
      chapter.name
    );

    if (!questions || questions.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to generate questions",
        },
        { status: 500 }
      );
    }

    // Create questions in the database
    await prisma.question.createMany({
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
    await prisma.chapter.update({
      where: { id: chapterId },
      data: {
        videoId,
        summary,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST /api/chapter/getInfo:", error);

    // Additional logging for debugging
    if (process.env.DATABASE_URL) {
      console.log("DATABASE_URL:", process.env.DATABASE_URL);
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid body",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
