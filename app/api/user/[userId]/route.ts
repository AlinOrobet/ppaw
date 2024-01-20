import {getAllUserPurchasesByUserId} from "@/model/purchase";
import {getUserById} from "@/model/user";
import {NextResponse} from "next/server";

export async function GET(req: Request, {params}: {params: {userId: string}}) {
  try {
    if (!params.userId) {
      return new NextResponse("User id not found", {status: 404});
    }

    const dbUser = await getUserById(params.userId);

    if (!dbUser) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    const userPurcahses = await getAllUserPurchasesByUserId(dbUser.id);

    return NextResponse.json(userPurcahses);
  } catch (error) {
    console.log("[USER_ID]_GET");
    return new NextResponse("Internal Error", {status: 500});
  }
}
