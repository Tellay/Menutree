import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/server/auth";
import { db } from "@/server/db";

import { Sidebar } from "./_components/sidebar";

export default async function AdminLayout({ children }: PropsWithChildren) {
  const session = await auth();
  if (!session) return redirect("/");

  const userRestaurants = await db.restaurant.findMany({
    where: {
      createdById: session!.user?.id,
    },
  });

  return (
    <div className="flex h-screen flex-col">
      <div className="grid h-full grid-cols-[324px_auto]">
        <Sidebar restaurants={userRestaurants} />
        {children}
      </div>
    </div>
  );
}
