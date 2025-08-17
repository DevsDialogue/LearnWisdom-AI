"use client";

import React from 'react';
import { Brain, TrendingUp, Users, Trophy, Sparkles } from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "Personalized Learning Paths",
      description: "AI analyzes your learning style and creates custom study plans tailored to your unique needs and goals",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: TrendingUp,
      title: "Smart Progress Tracking",
      description: "Monitor your growth with detailed analytics and insights that help you understand your strengths and areas for improvement",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    },
    {
      icon: Users,
      title: "Interactive AI Tutoring",
      description: "Get instant help from our advanced AI teaching assistant that understands your questions and provides clear explanations",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      icon: Trophy,
      title: "Gamified Learning",
      description: "Earn points, badges, and compete with friends while learning. Make education fun and engaging",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-float" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to
            <span className="gradient-text"> Excel</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform provides all the tools and support you need to master any subject efficiently
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              <div className={`${feature.bgColor} rounded-2xl p-8 hover-lift hover-glow transition-all duration-300`}>
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>

                {/* Visual Elements */}
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white" />
                    <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white" />
                    <div className="w-8 h-8 bg-gray-400 rounded-full border-2 border-white" />
                  </div>
                  <span className="text-sm text-gray-500">Used by 10k+ learners</span>
                </div>

                {/* Decorative Corner Element */}
                <div className="absolute top-4 right-4 opacity-10">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-full`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "⚡", label: "Lightning Fast" },
            { icon: "🔒", label: "Secure & Private" },
            { icon: "🌍", label: "Available 24/7" },
            { icon: "📱", label: "Mobile Friendly" }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-sm font-medium text-gray-700">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
