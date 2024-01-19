import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import Link from "next/link";
import {DocumentList} from "./_components/documents-list";

const DocumentsPage = () => {
  const documents = [
    {id: 1, label: "1"},
    {id: 2, label: "2"},
    {id: 3, label: "3"},
    {id: 1, label: "1"},
    {id: 2, label: "2"},
    {id: 3, label: "3"},
    {id: 1, label: "1"},
    {id: 2, label: "2"},
    {id: 3, label: "3"},
  ];
  return (
    <Card className="w-[600px] h-2/3 flex flex-col">
      <CardHeader className="border-b">
        <p className="text-2xl font-semibold text-center">🗎 Documents</p>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4">
        <DocumentList />
      </CardContent>
      <CardFooter className="pt-6 border-t">
        <Button asChild className="w-full">
          <Link href="/documents/create">Create new document</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DocumentsPage;
