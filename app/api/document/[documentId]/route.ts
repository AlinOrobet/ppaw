import {currentUser} from "@/lib/auth";
import {deleteDocumentById, getDocumentById, updateDocumentById} from "@/model/document";
import {getUserById} from "@/model/user";
import {NextResponse} from "next/server";

export async function PATCH(req: Request, {params}: {params: {documentId: string}}) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", {status: 401});
    }
    const existingDocument = await getDocumentById(params.documentId);
    if (!existingDocument) {
      return new NextResponse("Document not found", {status: 404});
    }
    if (existingDocument.userId !== user.id) {
      return new NextResponse("Unauthorized", {status: 401});
    }
    const values = await req.json();
    return NextResponse.json(await updateDocumentById(existingDocument.id, {...values}));
  } catch (error) {
    console.log("[DOCUMENT_ID]_PATCH", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}
export async function DELETE(req: Request, {params}: {params: {documentId: string}}) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", {status: 401});
    }
    const existingDocument = await getDocumentById(params.documentId);
    if (!existingDocument) {
      return new NextResponse("Document not found", {status: 404});
    }
    if (existingDocument.userId !== user.id) {
      return new NextResponse("Unauthorized", {status: 401});
    }
    return NextResponse.json(await deleteDocumentById(existingDocument.id));
  } catch (error) {
    console.log("[DOCUMENT_ID]_DELETE", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}
export async function GET(req: Request, {params}: {params: {documentId: string}}) {
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

    const existingDocument = await getDocumentById(params.documentId);
    if (!existingDocument) {
      return new NextResponse("Document not found", {status: 404});
    }
    if (existingDocument.userId !== dbUser.id) {
      return new NextResponse("Unauthorized", {status: 401});
    }
    return NextResponse.json(existingDocument);
  } catch (error) {
    console.log("[DOCUMENT_ID]_GET", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}
