import { PropsWithChildren } from "react";
import { MdEdit as Edit } from "react-icons/md";

import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

import { db } from "@/server/db";

import { Sidebar } from "./_components/sidebar";

export default async function AdminLayout({ children }: PropsWithChildren) {
  const session = await auth();
  if (!session) return redirect("/");

  const restaurants = await db.restaurant.findMany({
    where: {
      createdById: session.user?.id,
    },
  });

  return (
    <div className="flex h-screen flex-col">
      <div className="grid h-full grid-cols-[378px_auto]">
        <Sidebar restaurants={restaurants} />
        {children}
      </div>
    </div>
  );
}
