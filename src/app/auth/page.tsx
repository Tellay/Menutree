import Link from "next/link";

import { AuthProviders } from "./_components/auth-buttons";

export default async function AuthPage() {
  return (
    <div className="flex h-screen flex-col">
      <div className="grid h-full lg:grid-cols-2">
        <div className="hidden h-full items-end bg-primary p-10 lg:flex">
          <blockquote className="space-y-2 text-primary-foreground">
            <p className="text-lg">
              &ldquo;This company helps a lot to make my restaurant grow.
              Without it, it would take many more years, and it would be almost
              an impossible mission. I am eternally grateful to Menutree and
              it's team.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>

        <div className="mx-auto flex items-center px-4">
          <div className="text-center lg:w-[350px]">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Welcome
                </h1>
                <p className="text-sm text-muted-foreground">
                  Sign in to continue to the platform
                </p>
              </div>

              <AuthProviders />

              <p className="px-8 text-center text-xs text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
