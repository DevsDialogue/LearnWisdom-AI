"use client";

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does AI-powered learning work?",
      answer: "Our AI analyzes your learning patterns, strengths, and areas for improvement to create personalized study plans. It adapts in real-time based on your progress, ensuring you're always learning at the optimal pace and focusing on the right topics."
    },
    {
      question: "Can I try the platform before subscribing?",
      answer: "Absolutely! We offer a free tier that gives you access to basic features and 5 courses per month. Plus, all paid plans come with a 14-day free trial - no credit card required."
    },
    {
      question: "Is there a limit to how many courses I can take?",
      answer: "On the free plan, you can access 5 courses per month. With our Pro and Enterprise plans, you get unlimited access to all courses in our library, plus the ability to create custom learning paths."
    },
    {
      question: "Do you offer discounts for students or teams?",
      answer: "Yes! Students with a valid .edu email get 20% off all plans. For teams of 5 or more, we offer custom Enterprise pricing with additional features like team management and analytics dashboards."
    },
    {
      question: "Is my data secure?",
      answer: "Security is our top priority. We use bank-level encryption for all data, comply with GDPR and CCPA regulations, and never share your personal information with third parties. Your learning data is yours alone."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time with no penalties. If you cancel, you'll continue to have access until the end of your current billing period."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full mb-4">
            <HelpCircle className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">FAQs</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about LearnWisdomAI
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We&apos;re here to help!
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            Contact Support <span className="ml-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
