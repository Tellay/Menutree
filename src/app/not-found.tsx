import Link from "next/link";

import { auth } from "@/server/auth";

import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const session = await auth();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="container max-w-[480px]">
        <div className="flex flex-col items-center space-y-6 text-center">
          <h1 className="text-5xl font-bold tracking-tight">404</h1>

          <p className="text-muted-foreground">
            {session ? (
              <>
                You are authenticated in as{" "}
                <strong>{session.user?.email}</strong>
              </>
            ) : (
              <>You are not authenticated.</>
            )}
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/">Go to home page</Link>
            </Button>

            {!session && (
              <Button variant="outline" size="lg" asChild>
                <Link href="/auth">Go to auth page</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
