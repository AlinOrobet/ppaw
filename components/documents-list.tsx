"use client";
import {Button} from "@/components/ui/button";
import {Document} from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {toast} from "sonner";
import {ConfirmModal} from "./confirm-modal";
import {Badge} from "./ui/badge";

export const DocumentList = ({documents}: {documents: Document[]}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async (id: string) => {
    try {
      await axios.delete(`/api/document/${id}`);
      toast.success(`Success!`);
      router.refresh();
      setIsLoading(true);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const onChangeDocumentState = async (id: string, currentState: boolean) => {
    try {
      if (currentState) {
        await axios.patch(`/api/document/${id}/unpublish`);
        toast.success(`Unpublished!`);
      } else {
        await axios.patch(`/api/document/${id}/publish`);
        toast.success(`Published!`);
      }
      router.refresh();
      setIsLoading(true);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col space-y-4">
      {documents.map((document) => (
        <div key={document.id} className="flex flex-col space-y-2">
          <Link href={`/documents/${document.id}`} className="border border-input p-2 rounded-md">
            {document.title}
          </Link>
          <div className="flex items-center justify-between">
            <div onClick={() => onChangeDocumentState(document.id, document.isPublished)}>
              <Badge
                variant={document.isPublished ? "success" : "destructive"}
                className="cursor-pointer"
              >
                {document.isPublished ? "Published" : "Unpublished"}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button size="sm" asChild>
                <Link href={`/documents/${document.id}`}>Update</Link>
              </Button>
              <ConfirmModal onConfirm={() => onDelete(document.id)}>
                <Button size="sm" variant="destructive" disabled={isLoading}>
                  Delete
                </Button>
              </ConfirmModal>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
