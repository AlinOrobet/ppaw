import {db} from "@/lib/db";
import {Purchase} from "@prisma/client";

export const createPurchase = async (userId: string): Promise<Purchase> => {
  return await db.purchase.create({data: {userId}});
};
export const getAllUserPurchasesByUserId = async (userId: string): Promise<Purchase[]> => {
  return await db.purchase.findMany({where: {userId}, orderBy: {createdAt: "desc"}});
};
