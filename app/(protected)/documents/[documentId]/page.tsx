import {redirect} from "next/navigation";
import {currentUser} from "@/lib/auth";

import {DocumentForm} from "@/components/document-form";
import getDocumentById from "@/hooks/get-document-byId";

export const revalidate = 0;

const DocumentIdPage = async ({params}: {params: {documentId: string}}) => {
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }
  const document = await getDocumentById(params.documentId, user.id);

  if (!document) {
    return redirect("/documents");
  }
  return <DocumentForm title={document?.title || ""} buttonLabel="Update" initialData={document} />;
};

export default DocumentIdPage;
