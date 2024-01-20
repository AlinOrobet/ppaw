import {currentUser} from "@/lib/auth";

import {createUploadthing, type FileRouter} from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const existingUser = await currentUser();

  if (!existingUser) {
    throw new Error("Unauthorized");
  }

  return {userId: existingUser.id};
};

export const ourFileRouter = {
  image: f({image: {maxFileSize: "4MB", maxFileCount: 1}})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  attachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  video: f({video: {maxFileCount: 1, maxFileSize: "512GB"}})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
