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
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
  const session = await auth();
  if (!session) return redirect("/");

  const restaurants = await db.restaurant.findMany({
    where: {
      createdById: session.user?.id,
    },
  });

  return (
    <div>
      <div className="container">
        <div className="py-10">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold">Your restaurants</h1>
              <NewRestaurantDialog />
            </div>

            <BentoGrid className="lg:grid-cols-3">
              {restaurants.map((restaurant) => (
                <BentoGridCard className="group cursor-pointer hover:shadow-none">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <BentoGridCardTitle className="text-base">
                        {restaurant.name}
                      </BentoGridCardTitle>

                      <Edit className="hidden size-5 group-hover:block" />
                    </div>

                    <BentoGridCardDescription>
                      {restaurant.description}
                    </BentoGridCardDescription>
                  </div>
                </BentoGridCard>
              ))}
            </BentoGrid>
          </div>
        </div>
      </div>
    </div>
  );
}
