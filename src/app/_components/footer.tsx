import Link from "next/link";

export async function Footer() {
  return (
    <footer className="flex items-center justify-center gap-4 md:h-24 md:flex-row">
      <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
        The source code is available on{" "}
        <Link
          className="hover:underline"
          href="http://github.com/tellay/menutree"
        >
          GitHub
        </Link>
      </p>
    </footer>
  );
}
