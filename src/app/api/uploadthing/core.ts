import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { auth } from "@/server/auth";

const f = createUploadthing();

export const uploadThingRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = await auth();

      if (!session) throw new UploadThingError("Unauthorized");

      return { userId: session?.user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url);

      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type UploadThingRouter = typeof uploadThingRouter;
