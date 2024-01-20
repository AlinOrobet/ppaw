import {Purchase} from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/user`;

const getUserPurchases = async (userId: string): Promise<Purchase[]> => {
  try {
    const response = await fetch(`${URL}/${userId}`);
    if (!response.ok) {
      return [];
    }
    return response.json();
  } catch (error) {
    console.log("[getUserPurchases]", error);
    return [];
  }
};

export default getUserPurchases;
