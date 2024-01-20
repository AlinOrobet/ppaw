import {currentUser} from "@/lib/auth";
import {createDocument, getAllDocumentsByUserId} from "@/model/document";
import {getUserById} from "@/model/user";

import {NextResponse} from "next/server";

export async function POST(req: Request) {
  try {
    const values = await req.json();
    if (!values.userId) return new NextResponse("User id is required");
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", {status: 401});
    }
    if (user.id !== values.userId) {
      return new NextResponse("Unauthorized", {status: 401});
    }
    return NextResponse.json(await createDocument({...values}));
  } catch (error) {
    console.log("[DOCUMENT]_POST", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}

export async function GET(req: Request) {
  try {
    const {searchParams} = new URL(req.url);
    const userId = searchParams.get("userId") || undefined;

    if (!userId) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    const dbUser = await getUserById(userId);

    if (!dbUser) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    const userDocuments = await getAllDocumentsByUserId(dbUser.id);

    return NextResponse.json(userDocuments);
  } catch (error) {
    console.log("[DOCUMENT]_GET");
    return new NextResponse("Internal Error", {status: 500});
  }
}
