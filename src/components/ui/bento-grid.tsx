import React from "react";

import { cn } from "@/lib/utils";

export type BentoGridGenericProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
} & T;

export const BentoGrid = React.forwardRef<
  HTMLDivElement,
  BentoGridGenericProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export const BentoGridCard = React.forwardRef<
  HTMLDivElement,
  BentoGridGenericProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border px-6 py-8 transition-all hover:shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export const BentoGridCardTitle = React.forwardRef<
  HTMLHeadingElement,
  BentoGridGenericProps
>(({ children, className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn("text-balance text-2xl font-semibold", className)}
      {...props}
    >
      {children}
    </h3>
  );
});

export const BentoGridCardDescription = React.forwardRef<
  HTMLHeadingElement,
  BentoGridGenericProps
>(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-balance text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
});
