import {currentUser} from "@/lib/auth";

import {getDocumentById, publishDocumentById, unpublishDocumentById} from "@/model/document";

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
    return NextResponse.json(await unpublishDocumentById(existingDocument.id));
  } catch (error) {
    console.log("[UNPUBLISH-DOCUMENT_ID]_PATCH", error);
    return new NextResponse("Internal Error", {status: 500});
  }
}
