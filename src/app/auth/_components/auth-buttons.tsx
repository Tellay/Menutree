"use client";

import { FaGoogle as Google } from "react-icons/fa";

import { Button } from "@/components/ui/button";

import { signIn } from "next-auth/react";

export function AuthProviders() {
  return (
    <div className="grid gap-2">
      <Button
        className="gap-3"
        variant="outline"
        size="lg"
        onClick={async () => await signIn("google")}
      >
        <Google className="size-4" />
        Continue with Google
      </Button>
    </div>
  );
}
