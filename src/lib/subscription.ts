import { getAuthSession } from "./auth";
import { prisma } from "./db";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const checkSubscription = async () => {
  const session = getAuthSession();
  if (!session?.user) {
    return false;
  }
  const userSubscription = prisma.userSubscription.findUnique({
    where: {
      userId: session.user.id,
    },
  });
  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
};
