import { MdEdit as Edit } from "react-icons/md";

import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

import { db } from "@/server/db";

import { NewRestaurantDialog } from "./_components/new-restaurant-dialog";
import {
  BentoGrid,
  BentoGridCard,
  BentoGridCardDescription,
  BentoGridCardTitle,
} from "@/components/ui/bento-grid";
import { Sidebar } from "./_components/sidebar";

export default async function AdminPage() {
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
      </div>
    </div>
  );
}
