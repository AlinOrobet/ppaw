import {Document} from "@prisma/client";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/document`;

const getDocumentById = async (documentId: string, userId: string): Promise<Document | null> => {
  try {
    const url = qs.stringifyUrl({
      url: `${URL}/${documentId}`,
      query: {
        userId,
      },
    });
    const response = await fetch(`${url}`);
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    console.log("[get_Document]", error);
    return null;
  }
};

export default getDocumentById;
