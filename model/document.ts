import {db} from "@/lib/db";
import {Document} from "@prisma/client";

export const createDocument = async (values: Document): Promise<Document> => {
  return await db.document.create({
    data: {
      ...values,
    },
  });
};

export const updateDocumentById = async (
  id: string,
  values: Partial<Document>
): Promise<Document> => {
  return await db.document.update({
    where: {id},
    data: {...values},
  });
};

export const deleteDocumentById = async (id: string): Promise<Document> => {
  return await db.document.delete({
    where: {id},
  });
};

export const unpublishDocumentById = async (id: string): Promise<Document> => {
  return await updateDocumentById(id, {isPublished: false});
};

export const publishDocumentById = async (id: string): Promise<Document> => {
  return await updateDocumentById(id, {isPublished: true});
};

export const getDocumentById = async (id: string): Promise<Document | null> => {
  return await db.document.findUnique({where: {id}});
};

export const getAllDocumentsByUserId = async (userId: string): Promise<Document[]> => {
  return await db.document.findMany({where: {userId}, orderBy: {createdAt: "desc"}});
};
