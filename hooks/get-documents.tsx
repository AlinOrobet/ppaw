import {Document} from "@prisma/client";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/document`;

const getDocuments = async (userId: string): Promise<Document[]> => {
  try {
    const url = qs.stringifyUrl({
      url: `${URL}`,
      query: {
        userId,
      },
    });
    const response = await fetch(`${url}`);
    if (!response.ok) {
      return [];
    }
    return response.json();
  } catch (error) {
    console.log("[get_DOCUMENTS]", error);
    return [] as Document[];
  }
};

export default getDocuments;
