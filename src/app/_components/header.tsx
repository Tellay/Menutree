import Image from "next/image";
import Link from "next/link";
import { FaUserPlus as UserPlus } from "react-icons/fa6";

import { auth } from "@/server/auth";

import { User } from "./user";
import { Button } from "@/components/ui/button";

export async function Header() {
  const session = await auth();

  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 max-w-screen-2xl items-center px-6">
        <div className="flex w-full items-center justify-between">
          <div className="relative size-6">
            <Image src="/menutree_nobg.svg" alt="Menutree logo" fill />
          </div>

          {!session?.user ? (
            <Button className="gap-2" variant="outline" asChild>
              <Link href="/auth">
                <UserPlus className="size-4" />
                Sign In
              </Link>
            </Button>
          ) : (
            <User />
          )}
        </div>
      </div>
    </div>
  );
}
