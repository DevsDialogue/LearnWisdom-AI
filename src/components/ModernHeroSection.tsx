"use client";
import React from 'react';
import { Check, Play, Star, Sparkles, Zap, Target, Brain, BookOpen } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const ModernHeroSection = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const features = [
    "Personalized AI Tutoring",
    "Adaptive Learning Paths", 
    "24/7 Learning Support"
  ];

  const integrations = [
    { name: "OpenAI", icon: "🤖" },
    { name: "Google", icon: "🔍" },
    { name: "Khan Academy", icon: "📚" },
    { name: "Coursera", icon: "🎓" },
    { name: "Udemy", icon: "💡" },
    { name: "edX", icon: "🏛️" }
  ];

  const handleStartLearning = () => {
    if (status === 'loading') return; // Don't do anything while loading
    
    if (session?.user) {
      // User is authenticated, redirect to create page
      router.push('/create');
    } else {
      // User is not authenticated, redirect to sign in
      router.push('/api/auth/signin');
    }
  };

  return (
    <section id="home" className="relative min-h-screen gradient-bg-primary overflow-hidden flex items-center pt-20 pb-20">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Scattered dots and shapes */}
        <div className="absolute w-20 h-20 top-20 left-[10%] bg-yellow-400/20 rounded-full animate-float" />
        <div className="absolute w-14 h-14 top-40 right-[15%] bg-blue-400/20 rounded-lg rotate-45 animate-float-slow" />
        <div className="absolute w-32 h-32 bottom-20 left-[20%] bg-purple-400/10 rounded-full animate-pulse" />
        <div className="absolute w-24 h-24 bottom-40 right-[25%] bg-green-400/20 rounded-lg animate-float" />
        <div className="absolute w-16 h-16 top-32 left-[70%] bg-pink-400/20 rounded-full animate-float-slow" />
        <div className="absolute w-12 h-12 top-60 right-[40%] bg-cyan-400/20 rounded-lg animate-float" />
        
        {/* Additional floating shapes for better distribution */}
        <div className="absolute top-1/3 left-[8%] animate-float-slow">
          <div className="w-10 h-10 bg-yellow-400/30 rounded-full" />
        </div>
        <div className="absolute top-2/3 right-[12%] animate-float">
          <div className="w-8 h-8 bg-blue-400/30 rounded-lg rotate-45" />
        </div>
      </div>

      {/* Main Content Container - Centered with proper spacing */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        <div className="text-center mb-16">
          {/* Badge with proper top spacing */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 mt-4">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white">AI-Powered Learning Platform</span>
          </div>

          {/* Main Headline - Centered */}
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            Master Any Subject.
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI-Powered Learning.
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"></div>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto">
            No boring lectures. No overwhelming content.<br />
            Just personalized, adaptive learning that fits your pace.
          </p>

          {/* CTA Buttons - Centered */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={handleStartLearning}
              disabled={status === 'loading'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{status === 'loading' ? 'Loading...' : 'Start Learning Free'}</span>
              <Zap className="w-4 h-4" />
            </button>
            <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-200 flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Feature List - Centered with more bottom spacing */}
          <div className="flex flex-wrap justify-center gap-6 mb-20">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-200 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Mockup - Centered with proper bottom spacing */}
        <div className="relative max-w-4xl mx-auto mb-16">
          {/* Main Dashboard Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 relative hover:shadow-3xl transition-all duration-300">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Learning Dashboard</h3>
                  <p className="text-sm text-gray-500">Your personalized study hub</p>
                </div>
              </div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-white" />
                <div className="w-8 h-8 bg-green-400 rounded-full border-2 border-white" />
                <div className="w-8 h-8 bg-blue-400 rounded-full border-2 border-white" />
              </div>
            </div>

            {/* Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <span className="text-xs text-green-600 font-medium">+15%</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">142</div>
                <div className="text-sm text-gray-600">Lessons Completed</div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">+8%</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">89%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Sparkles className="w-5 h-5 text-orange-600" />
                  <span className="text-xs text-green-600 font-medium">+12%</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">2.4k</div>
                <div className="text-sm text-gray-600">Study Hours</div>
              </div>
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Star className="w-5 h-5 text-cyan-600" />
                  <span className="text-xs text-green-600 font-medium">+25%</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">4.9</div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </div>
            </div>

            {/* Course List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🧮</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Advanced Mathematics</div>
                    <div className="text-sm text-gray-500">Chapter 5: Calculus</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-blue-600">75%</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🔬</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Data Science Basics</div>
                    <div className="text-sm text-gray-500">Module 3: Python</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-green-600">92%</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🎨</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Creative Writing</div>
                    <div className="text-sm text-gray-500">Week 2: Poetry</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-purple-600">88%</div>
              </div>
            </div>
          </div>

          {/* Floating Elements - Balanced around center */}
          <div className="absolute -top-8 -right-8 bg-white rounded-xl shadow-lg p-3 animate-float">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🤖</span>
              <div className="text-xs">
                <div className="font-semibold">AI Tutor Active</div>
                <div className="text-gray-500">Ready to help</div>
              </div>
            </div>
          </div>
          <div className="absolute -top-8 -left-8 bg-white rounded-xl shadow-lg p-3 animate-float-slow">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📊</span>
              <div className="text-xs">
                <div className="font-semibold">Progress Tracked</div>
                <div className="text-gray-500">Real-time updates</div>
              </div>
            </div>
          </div>

          {/* Tool & Platform Integration Box */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg p-4 animate-float-slow">
            <div className="text-sm font-semibold text-gray-800 mb-3 text-center">Tool & Platform Integration</div>
            <div className="flex justify-center space-x-2">
              {integrations.map((tool, index) => (
                <div key={index} className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-lg">{tool.icon}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Icons - Balanced positioning */}
          <div className="absolute top-1/2 -left-16 transform -translate-y-1/2">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-cyan-400 rounded-xl flex items-center justify-center animate-float shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="w-14 h-14 bg-purple-400 rounded-xl flex items-center justify-center animate-float-slow shadow-lg">
                <Star className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="absolute top-1/2 -right-16 transform -translate-y-1/2">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center animate-float shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="w-14 h-14 bg-green-400 rounded-xl flex items-center justify-center animate-float-slow shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};