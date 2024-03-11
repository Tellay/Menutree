import Link from "next/link";
import { Restaurant } from "@prisma/client";

import { cn } from "@/lib/utils";

import { NewRestaurantDialog } from "./new-restaurant-dialog";
import { Button } from "@/components/ui/button";

interface ISidebarProps {
  restaurants: Restaurant[];
}

export async function Sidebar({ restaurants }: ISidebarProps) {
  return (
    <aside className="m-6 rounded-lg bg-primary p-6">
      <div className="flex h-full flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="px-2 py-1 text-sm font-semibold text-primary-foreground">
            Restaurants
          </h4>

          <NewRestaurantDialog />
        </div>

        <div className="grid flex-grow gap-2">
          {restaurants.length === 0 && (
            <p className="text-center text-sm text-primary-foreground">
              You don't have any restaurants...
            </p>
          )}
          {restaurants.length !== 0 &&
            restaurants.map((restaurant) => (
              <Button
                key={restaurant.id}
                className={cn(
                  "size-full h-full bg-secondary/10 hover:bg-secondary/5",
                  restaurants.length === 1 && "h-[250px]",
                )}
                asChild
              >
                <Link href={`/admin/restaurant/${restaurant.id}`}>
                  {restaurant.name}
                </Link>
              </Button>
            ))}
        </div>
      </div>
    </aside>
  );
}
