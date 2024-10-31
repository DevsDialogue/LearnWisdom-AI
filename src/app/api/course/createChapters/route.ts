import { NextResponse } from "next/server";
import { createChaptersSchema } from "@/validators/course";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";
import { getUnsplashImage } from "@/lib/unsplash";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, units } = createChaptersSchema.parse(body);

    type outputUnits = {
      title: string;
      chapters: {
        title: string;
        youtube_search_query: string;
        chapter_title: string;
      }[];
    };

    // Generate chapters and YouTube search queries
    const output_units: outputUnits = await strict_output(
      "You are an AI capable of curating course content, coming up with relevant chapter titles, and finding relevant YouTube videos for each chapter",
      new Array(units.length).fill(
        `It is your job to create a course about ${title}. The user has requested to create chapters for each of the units. Then, for each chapter, provide a detailed YouTube search query that can be used to find an informational educational video for each chapter. Each query should give an educational informative course on YouTube.`
      ),
      {
        title: "title of the unit",
        chapters:
          "an array of chapters, each chapter should have a youtube_search_query and a chapter_title key in the JSON object",
      }
    );

    // Generate an image search term and fetch course image
    const imageSearchTerm = await strict_output(
      "you are an AI capable of finding the most relevant image for a course",
      `Please provide a good image search term for the title of a course about ${title}. This search term will be fed into the Unsplash API, so make sure it is a good search term that will return good results.`,
      {
        image_search_term:
          "a good search term image for the title of the course",
      }
    );

    const course_image = await getUnsplashImage(
      imageSearchTerm.image_search_term
    );

    // Generate course description dynamically
    const courseDescription = await strict_output(
      "You are an AI that generates course descriptions.",
      `Please provide a short description for a course titled "${title}".`,
      {
        description: "A brief description of the course",
      }
    );

    // Create the course in the database
    const course = await prisma.course.create({
      data: {
        name: title,
        image: course_image,
        description: courseDescription.description, // Include description here
      },
    });

    // Create units and chapters
    for (const unit of output_units) {
      const title = unit.title;
      const prismaUnit = await prisma.unit.create({
        data: {
          name: title,
          courseId: course.id,
        },
      });
      await prisma.chapter.createMany({
        data: unit.chapters.map((chapter) => {
          return {
            name: chapter.chapter_title,
            youtubeSearchQuery: chapter.youtube_search_query,
            unitId: prismaUnit.id,
          };
        }),
      });
    }

    return NextResponse.json({ course_id: course.id });
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Zod validation error:", error);
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    console.error("Unexpected error:", error); // Log unexpected error details
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
