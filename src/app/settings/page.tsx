import SubscriptionButton from "@/components/SubscriptionButton";
import { checkSubscription } from "@/lib/subscription";
import { getAuthSession } from "@/lib/auth";
import React from "react";
import Image from "next/image";

const SettingsPage = async () => {
  const session = await getAuthSession();
  const isPro = await checkSubscription();

  // Fallback in case session or user data is not available
  if (!session || !session.user) {
    return (
      <div className="py-8 mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <p className="text-xl text-secondary-foreground/60">
          Please log in to view your settings.
        </p>
      </div>
    );
  }

  return (
    <div className="py-8 mx-auto max-w-7xl text-center">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Card Component */}
      <div className="max-w-md mx-auto border border-white border-r-foreground bg-background/100 shadow-lg rounded-lg p-6">
        {/* User Info */}
        <div className="flex justify-center mb-4">
          <Image
            src={session.user.image || "/default-avatar.jpg"} // Fallback image if user doesn't have a photo
            alt="User Photo"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 "
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-50">
            {session.user.name}
          </h2>
          <p className="text-sm text-gray-500">{session.user.email}</p>
        </div>

        {/* Subscription Info */}
        <div className="mt-6 text-center">
          {isPro ? (
            <p className="text-xl text-green-600 ">You are a pro user 😎</p>
          ) : (
            <p className="text-xl text-red-600">You are a free user</p>
          )}

          {/* Subscription Button */}
          <SubscriptionButton isPro={isPro} />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
