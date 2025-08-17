"use client";

import React, { useState } from 'react';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { RAZORPAY_PLANS } from '@/lib/razorpay';

// Proper TypeScript interfaces instead of 'any'
interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayErrorResponse {
  error: {
    code: string;
    description?: string;
    source?: string;
    step?: string;
    reason?: string;
    metadata?: Record<string, unknown>;
  };
}

interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayInstance {
  open(): void;
  on(event: 'payment.failed', handler: (response: RazorpayErrorResponse) => void): void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayCheckoutOptions) => RazorpayInstance;
  }
}

export const PricingSection = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isYearly, setIsYearly] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const plans = [
    {
      ...RAZORPAY_PLANS.FREE,
      id: 'free',
      yearlyPrice: 0,
      period: "",
      description: "Perfect for trying out our platform",
      popular: false,
      icon: Sparkles,
      color: "from-gray-400 to-gray-600",
      cta: "Get Started Free",
      ctaColor: "bg-gray-600 hover:bg-gray-700"
    },
    {
      ...RAZORPAY_PLANS.PRO,
      id: 'pro',
      yearlyPrice: Math.round(RAZORPAY_PLANS.PRO.price * 10 * 0.5),
      period: "/month",
      description: "For serious learners and students", 
      popular: true,
      icon: Zap,
      color: "from-blue-500 to-purple-600",
      cta: "Start Free Trial",
      ctaColor: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
    },
    {
      ...RAZORPAY_PLANS.ENTERPRISE,
      id: 'enterprise',
      yearlyPrice: Math.round(RAZORPAY_PLANS.ENTERPRISE.price * 10 * 0.5),
      period: "/month",
      description: "For teams and organizations",
      popular: false,
      icon: Crown,
      color: "from-purple-600 to-pink-600",
      cta: "Contact Sales",
      ctaColor: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
    }
  ];

  const handleSubscription = async (planId: string) => {
    if (!session?.user) {
      router.push('/auth/signin');
      return;
    }

    if (planId === 'free') {
      toast({
        title: "You&#39;re already on the free plan!",
        description: "Start creating courses to experience our platform.",
      });
      return;
    }

    if (planId === 'enterprise') {
      router.push('/contact');
      return;
    }

    setLoading(planId);

    try {
      const plan = plans.find(p => p.id === planId);
      if (!plan) throw new Error('Plan not found');

      const amount = isYearly ? plan.yearlyPrice : plan.price;

      const orderResponse = await axios.post('/api/razorpay/create-order', {
        amount: amount / 100,
        currency: 'INR',
        plan: planId,
      });

      const { orderId, key } = orderResponse.data;

      const options: RazorpayCheckoutOptions = {
        key,
        amount: amount,
        currency: 'INR',
        name: 'LearnWisdomAI',
        description: `${plan.name} Plan Subscription`,
        order_id: orderId,
        handler: async function (response: RazorpayPaymentResponse) {
          try {
            await axios.post('/api/razorpay/verify-payment', {
              razorpay_order_id: orderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: planId,
            });

            toast({
              title: "Payment Successful!",
              description: `Welcome to ${plan.name} plan. Enjoy unlimited course generation!`,
            });

            router.push('/create');
          } catch (error) {
            console.error('Payment verification failed:', error);
            toast({
              title: "Payment verification failed",
              description: "Please contact support if the amount was deducted.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: session.user.name || '',
          email: session.user.email || '',
        },
        theme: {
          color: '#3B82F6',
        },
        modal: {
          ondismiss: function() {
            setLoading(null);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response: RazorpayErrorResponse) {
        console.error('Payment failed:', response.error);
        toast({
          title: "Payment Failed",
          description: response.error.description || "Something went wrong",
          variant: "destructive",
        });
      });

      razorpay.open();
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <section id="pricing" className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pick the <span className="gradient-text">Perfect Plan</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Start learning for free, upgrade when you&#39;re ready. No hidden fees, cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center space-x-4 bg-white rounded-full p-1 shadow-lg">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  !isYearly ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-gray-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  isYearly ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-gray-600'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  Save 50%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className="relative">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className={`bg-white rounded-2xl p-8 ${plan.popular ? 'ring-2 ring-purple-600 shadow-2xl scale-105' : 'shadow-lg'} hover-lift`}>
                  {/* Plan Icon & Name */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                      <p className="text-sm text-gray-600">{plan.description}</p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-br ${plan.color} rounded-lg flex items-center justify-center`}>
                      <plan.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      ₹{isYearly ? (plan.yearlyPrice / 100).toFixed(0) : (plan.price / 100).toFixed(0)}
                    </span>
                    <span className="text-gray-600">{plan.period}</span>
                    {isYearly && plan.price !== 0 && (
                      <div className="text-sm text-gray-500 line-through">
                        ₹{(plan.price / 100).toFixed(0)}{plan.period}
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button 
                    className={`w-full ${plan.ctaColor} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all mb-6 disabled:opacity-50`}
                    onClick={() => handleSubscription(plan.id)}
                    disabled={loading === plan.id}
                  >
                    {loading === plan.id ? 'Processing...' : plan.cta}
                  </button>

                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              All plans include a <span className="font-semibold">14-day free trial</span>. No credit card required for free plan.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
