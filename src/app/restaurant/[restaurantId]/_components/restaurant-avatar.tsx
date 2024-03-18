"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface RestaurantAvatarProps {
  className?: string;
  img: string;
}

export function RestaurantAvatar({ className, img }: RestaurantAvatarProps) {
  return (
    <Avatar className={cn("size-[98px]", className)}>
      <AvatarImage src={img} />
      <AvatarFallback />
    </Avatar>
  );
}
