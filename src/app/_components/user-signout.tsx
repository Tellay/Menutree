"use client";

import { signOut } from "next-auth/react";
import { MdLogout as Logout } from "react-icons/md";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function UserSignOut() {
  return (
    <DropdownMenuItem
      className="cursor-pointer gap-2"
      onClick={async () => await signOut()}
    >
      <Logout className="size-4" />
      Logout
    </DropdownMenuItem>
  );
}
