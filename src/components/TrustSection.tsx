"use client";

import React from 'react';
import { Star, Users, Award, TrendingUp } from 'lucide-react';

export const TrustSection = () => {
  const stats = [
    { icon: Users, value: "50K+", label: "Active Learners" },
    { icon: Star, value: "4.9/5", label: "Average Rating" },
    { icon: Award, value: "10M+", label: "Lessons Completed" },
    { icon: TrendingUp, value: "94%", label: "Success Rate" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      avatar: "👩‍💻",
      rating: 5,
      comment: "The AI tutor adapts to my learning style perfectly. I've improved my grades by 30% in just 2 months!"
    },
    {
      name: "Michael Chen",
      role: "Data Analyst",
      avatar: "👨‍💼",
      rating: 5,
      comment: "Best platform for continuous learning. The personalized paths save me hours of searching for the right content."
    },
    {
      name: "Emily Rodriguez",
      role: "High School Teacher",
      avatar: "👩‍🏫",
      rating: 5,
      comment: "I recommend LearnWisdomAI to all my students. The 24/7 support means they can learn at their own pace."
    }
  ];

  const companies = [
    { name: "Google", logo: "🔍" },
    { name: "Microsoft", logo: "🪟" },
    { name: "Apple", logo: "🍎" },
    { name: "Tesla", logo: "⚡" },
    { name: "Amazon", logo: "📦" },
    { name: "Meta", logo: "🌐" }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Learners
            <span className="gradient-text"> Around the World</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of students and professionals who are transforming their education with AI-powered learning
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-3">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover-lift">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic">&ldquo;{testimonial.comment}&rdquo;</p>
            </div>
          ))}
        </div>

        {/* Company Logos */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-6">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {companies.map((company, index) => (
              <div key={index} className="flex items-center space-x-2 grayscale hover:grayscale-0 transition-all">
                <span className="text-3xl">{company.logo}</span>
                <span className="text-xl font-semibold text-gray-700">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
