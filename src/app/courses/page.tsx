import GalleryCourseCard from "@/components/GalleryCourseCard";
import { prisma } from "@/lib/db";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    include: {
      units: {
        include: {
          chapters: true
        }
      }
    }
  });

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Available Courses
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Explore our comprehensive collection of AI-powered courses designed to enhance your learning experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <GalleryCourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
