import { getAuthSession } from './auth';
import { prisma } from './db';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const checkSubscription = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return false;
  }

  const userSubscription = await prisma.userSubscription.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription?.isActive &&
    userSubscription?.plan &&
    (userSubscription?.currentPeriodEnd?.getTime() ?? 0) + DAY_IN_MS >
      Date.now();

  return !!isValid;
};

export const getSubscriptionPlan = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return null;
  }

  const userSubscription = await prisma.userSubscription.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  return userSubscription?.plan || 'free';
};