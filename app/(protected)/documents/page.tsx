import Link from "next/link";
import {redirect} from "next/navigation";

import {currentUser} from "@/lib/auth";
import getDocuments from "@/hooks/get-documents";

import {DocumentList} from "@/components/documents-list";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {InfoCard} from "@/components/info-card";
import {Activity, Clock} from "lucide-react";

export const revalidate = 0;

const DocumentsPage = async () => {
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }
  const documents = await getDocuments(user.id);
  return (
    <Card className="w-[600px] h-2/3 flex flex-col">
      <CardHeader className="border-b">
        <p className="text-2xl font-semibold text-center">📃 Documents</p>
      </CardHeader>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 p-4">
        <InfoCard icon={Activity} label="Current len" numberOfItems={documents.length} />
        <InfoCard
          icon={Clock}
          label="Limit len"
          numberOfItems={user.documentsCount}
          variant="success"
        />
      </div>
      <CardContent className="flex-1 overflow-y-auto p-4">
        <DocumentList documents={documents} />
      </CardContent>
      <CardFooter className="pt-6 border-t">
        <Button asChild size="lg" className="w-full">
          {documents.length >= user.documentsCount ? (
            <Link href="/subscription">Create new subscription</Link>
          ) : (
            <Link href="/documents/create">Create new document</Link>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DocumentsPage;
