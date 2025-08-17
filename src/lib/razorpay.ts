import Razorpay from 'razorpay';

// Don't initialize Razorpay at module level - do it inside functions
export const createRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay configuration missing');
  }
  
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

export const RAZORPAY_PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    credits: 10,
    features: [
      "Basic AI tutoring",
      "5 courses per month", 
      "Community support",
      "Basic progress tracking",
      "Limited AI interactions"
    ]
  },
  PRO: {
    name: "Pro",
    price: 499, // ₹4.99 in paise
    credits: -1, // unlimited
    features: [
      "Advanced AI tutoring",
      "Unlimited courses",
      "Priority support", 
      "Advanced analytics",
      "Unlimited AI interactions",
      "Personalized study plans",
      "Offline downloads",
      "Certificate generation"
    ]
  },
  ENTERPRISE: {
    name: "Enterprise", 
    price: 1749, // ₹17.49 in paise
    credits: -1, // unlimited
    features: [
      "Everything in Pro",
      "Custom learning paths",
      "Team management",
      "Analytics dashboard",
      "API access",
      "White-label options",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee"
    ]
  }
} as const;
