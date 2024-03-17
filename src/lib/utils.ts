import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber({
  number,
  notation = "standard",
}: {
  number: number;
  notation: "standard" | "compact";
}) {
  return Intl.NumberFormat("en-US", { notation }).format(number);
}
