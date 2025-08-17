import Link from "next/link"
import { Brain, Sparkles, Star, BookOpen, Target } from "lucide-react"
import { UserAuthForm } from "@/components/UserAuthForm"

export default async function AuthenticationPage() {
  return (
    <div className="gradient-bg-primary relative min-h-screen overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        {/* Main decorative elements */}
        <div className="absolute w-20 h-20 top-20 left-[8%] bg-yellow-400/20 rounded-full animate-float" />
        <div className="absolute w-16 h-16 top-40 right-[12%] bg-blue-400/25 rounded-lg rotate-45 animate-float-slow" />
        <div className="absolute w-28 h-28 bottom-20 left-[15%] bg-purple-400/15 rounded-full animate-pulse" />
        <div className="absolute w-22 h-22 bottom-40 right-[20%] bg-green-400/20 rounded-lg animate-float" />
        <div className="absolute w-18 h-18 top-32 left-[75%] bg-pink-400/20 rounded-full animate-float-slow" />
        <div className="absolute w-14 h-14 top-60 right-[35%] bg-cyan-400/25 rounded-lg animate-float" />
        
        {/* Additional smaller elements for richness */}
        <div className="absolute w-10 h-10 top-1/3 left-[5%] bg-orange-400/20 rounded-full animate-float-slow" />
        <div className="absolute w-12 h-12 bottom-1/3 right-[8%] bg-indigo-400/20 rounded-lg rotate-12 animate-float" />
        <div className="absolute w-8 h-8 top-2/3 left-[85%] bg-rose-400/25 rounded-full animate-pulse" />
      </div>
      
      {/* Desktop Layout */}
      <div className="container relative hidden min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Left Panel - Enhanced */}
        <div className="relative hidden h-full flex-col p-12 text-white lg:flex">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/95 via-purple-600/90 to-indigo-700/95 backdrop-blur-sm" />
          
          {/* Logo Section */}
          <div className="relative z-20 flex items-center gap-3 text-xl font-bold">
            <div className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="h-8 w-8" />
            </div>
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              LearnWisdomAI
            </span>
          </div>
          
          {/* Middle Content - Feature Highlights */}
          <div className="relative z-20 flex-1 flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold leading-tight">
                Transform Your Learning Journey with AI
              </h2>
              <p className="text-lg text-blue-100 leading-relaxed">
                Join thousands of learners who are accelerating their education with personalized AI tutoring.
              </p>
            </div>
            
            {/* Feature List */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                </div>
                <span className="text-white/90">AI-Powered Personalized Learning</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-green-300" />
                </div>
                <span className="text-white/90">Interactive Course Library</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-pink-300" />
                </div>
                <span className="text-white/90">Progress Tracking &amp; Analytics</span>
              </div>
            </div>
          </div>
          
          {/* Testimonial Section */}
          <div className="relative z-20">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <blockquote className="space-y-4">
                <div className="flex text-yellow-300">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-lg italic">
                  &ldquo;LearnWisdomAI has revolutionized my learning experience. The AI-powered tutoring system adapts perfectly to my pace and learning style.&rdquo;
                </p>
                <footer className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">SC</span>
                  </div>
                  <div>
                    <div className="font-medium text-white">Sarah Chen</div>
                    <div className="text-sm text-blue-100">Data Science Student</div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
        
        {/* Right Panel - Auth Form */}
        <div className="relative flex items-center justify-center p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[400px]">
            {/* Header */}
            <div className="flex flex-col space-y-3 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Welcome Back
              </h1>
              <p className="text-gray-300 text-base">
                Sign in to continue your AI-powered learning journey
              </p>
            </div>
            
            {/* Auth Form Container */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl">
              <UserAuthForm />
            </div>
            
            {/* Footer Links */}
            <div className="text-center">
              <p className="text-sm text-gray-400 leading-relaxed">
                By continuing, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-blue-300 hover:text-blue-200 underline underline-offset-4 transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-blue-300 hover:text-blue-200 underline underline-offset-4 transition-colors"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Enhanced */}
      <div className="container relative flex min-h-screen flex-col items-center justify-center md:hidden px-4">
        <div className="mx-auto flex w-full flex-col justify-center space-y-8 max-w-sm">
          {/* Mobile Header */}
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Brain className="h-12 w-12 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                LearnWisdomAI
              </h1>
              <p className="text-gray-300 text-base">
                Sign in to unlock your potential
              </p>
            </div>
          </div>
          
          {/* Mobile Auth Form */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
            <UserAuthForm />
          </div>
          
          {/* Mobile Stats */}
          <div className="grid grid-cols-3 gap-4 py-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-xs text-gray-400">Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.9</div>
              <div className="text-xs text-gray-400">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">1000+</div>
              <div className="text-xs text-gray-400">Courses</div>
            </div>
          </div>
          
          {/* Mobile Footer */}
          <div className="text-center">
            <p className="text-xs text-gray-400 leading-relaxed">
              By signing in, you agree to our{" "}
              <Link
                href="/terms"
                className="text-blue-300 hover:text-blue-200 underline underline-offset-2"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-blue-300 hover:text-blue-200 underline underline-offset-2"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}