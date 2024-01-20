import {db} from "@/lib/db";
import {StripeCustomer} from "@prisma/client";

type PickOnly<T, K extends keyof T> = Pick<T, K> & {[P in Exclude<keyof T, K>]?: never};

export const getStripeCustomerByUserId = async (
  userId: string
): Promise<{stripeCustomerId: string} | null> => {
  return await db.stripeCustomer.findUnique({
    where: {userId},
    select: {
      stripeCustomerId: true,
    },
  });
};

export const createStripeCustomer = async (
  values: PickOnly<StripeCustomer, "userId" | "stripeCustomerId">
): Promise<StripeCustomer> => {
  return await db.stripeCustomer.create({data: {...values}});
};
