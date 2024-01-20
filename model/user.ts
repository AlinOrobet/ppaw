import {db} from "@/lib/db";
import {Purchase, User} from "@prisma/client";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await db.user.findUnique({where: {email}});
};

export const getUserById = async (id: string): Promise<User | null> => {
  return await db.user.findUnique({where: {id}});
};

export const updateUserById = async (id: string, values: Partial<User>) => {
  return await db.user.update({where: {id}, data: {...values}});
};
