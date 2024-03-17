import React from "react";

import { cn } from "@/lib/utils";

export type InformationCardGenericProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
} & T;

export const InformationCard = React.forwardRef<
  HTMLDivElement,
  InformationCardGenericProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("overflow-hidden rounded-md border bg-muted", className)}
      {...props}
    >
      {children}
    </div>
  );
});

export const InformationCardHeader = React.forwardRef<
  HTMLDivElement,
  InformationCardGenericProps
>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-3 p-6", className)} {...props}>
      {children}
    </div>
  );
});

export const InformationCardTitle = React.forwardRef<
  HTMLHeadingElement,
  InformationCardGenericProps
>(({ children, className, ...props }, ref) => {
  return (
    <h4 ref={ref} className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </h4>
  );
});

export const InformationCardDescription = React.forwardRef<
  HTMLParagraphElement,
  InformationCardGenericProps
>(({ children, className, ...props }, ref) => {
  return (
    <p ref={ref} className={cn("text-sm", className)} {...props}>
      {children}
    </p>
  );
});

export const InformationCardFooter = React.forwardRef<
  HTMLElement,
  InformationCardGenericProps
>(({ children, className, ...props }, ref) => {
  return (
    <footer
      ref={ref}
      className={cn(
        "flex h-16 items-center border-t bg-background px-6 py-3",
        className,
      )}
      {...props}
    >
      {children}
    </footer>
  );
});

export const InformationCardFooterText = React.forwardRef<
  HTMLParagraphElement,
  InformationCardGenericProps
>(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
});
