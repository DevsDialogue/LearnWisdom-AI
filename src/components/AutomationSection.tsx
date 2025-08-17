"use client";

import React from 'react';
import { Calendar, BarChart3, Clock, Bell, Cpu, LineChart, Settings, Target } from 'lucide-react';

export const AutomationSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Automate Learning,
            <br />
            <span className="gradient-text">Maximize Results.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Transform your education with AI-powered tools, smart scheduling, and personalized study recommendations that adapt to your progress in real-time.
          </p>
        </div>

        {/* Two Feature Highlights */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Smart Study Scheduler */}
          <div className="relative">
            <div className="mb-6">
              <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Smart Study Scheduler</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Never miss a study session
              </h3>
              <p className="text-gray-600">
                Our AI automatically schedules your study sessions based on your availability, learning goals, and optimal retention times.
              </p>
            </div>

            {/* Calendar Mockup */}
            <div className="bg-white rounded-xl shadow-xl p-6 hover-lift">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800">Your Study Week</h4>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Clock className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Bell className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="text-xs font-medium text-gray-500 text-center">
                    {day}
                  </div>
                ))}
                {[...Array(7)].map((_, index) => (
                  <div key={index} className="aspect-square rounded-lg bg-gray-50 p-2">
                    {index === 1 && (
                      <div className="w-full h-full bg-blue-500 rounded text-white text-xs flex items-center justify-center">
                        Math
                      </div>
                    )}
                    {index === 3 && (
                      <div className="w-full h-full bg-green-500 rounded text-white text-xs flex items-center justify-center">
                        Science
                      </div>
                    )}
                    {index === 5 && (
                      <div className="w-full h-full bg-purple-500 rounded text-white text-xs flex items-center justify-center">
                        Code
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Upcoming Sessions */}
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm font-medium">Calculus Review</span>
                  </div>
                  <span className="text-xs text-gray-500">Today, 3:00 PM</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium">Physics Lab</span>
                  </div>
                  <span className="text-xs text-gray-500">Tomorrow, 2:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Progress Insights */}
          <div className="relative">
            <div className="mb-6">
              <div className="inline-flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full mb-4">
                <BarChart3 className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-600">AI Progress Insights</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Track your growth in real-time
              </h3>
              <p className="text-gray-600">
                Get detailed analytics and AI-powered insights that help you understand your learning patterns and optimize your study approach.
              </p>
            </div>

            {/* Analytics Dashboard Mockup */}
            <div className="bg-white rounded-xl shadow-xl p-6 hover-lift">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800">Learning Analytics</h4>
                <Settings className="w-4 h-4 text-gray-600" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="text-xs text-green-600">+12%</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">87%</div>
                  <div className="text-xs text-gray-600">Accuracy Rate</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <Cpu className="w-4 h-4 text-purple-600" />
                    <span className="text-xs text-green-600">+8h</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">142h</div>
                  <div className="text-xs text-gray-600">Study Time</div>
                </div>
              </div>

              {/* Progress Chart */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Weekly Progress</span>
                  <LineChart className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex items-end space-x-2 h-24">
                  {[40, 65, 55, 75, 80, 90, 85].map((height, index) => (
                    <div key={index} className="flex-1">
                      <div 
                        className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                    <span key={index} className="text-xs text-gray-500">{day}</span>
                  ))}
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-3 rounded-lg">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">🤖</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">AI Recommendation</div>
                    <div className="text-xs text-gray-600">Focus more on Chapter 5 - you&apos;re 15% below target</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 text-lg">
            See How It Works
          </button>
        </div>
      </div>
    </section>
  );
};
