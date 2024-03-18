import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { UploadThingRouter } from "@/app/api/uploadthing/core";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber({
  number,
  notation = "standard",
}: {
  number: number;
  notation?: "standard" | "compact";
}) {
  return Intl.NumberFormat("en-US", { notation }).format(number);
}

export const UploadButton = generateUploadButton<UploadThingRouter>();
export const UploadDropzone = generateUploadDropzone<UploadThingRouter>();
