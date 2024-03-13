import { Restaurant } from "@prisma/client";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NewRestaurantDialog } from "./new-restaurant-dialog";

interface ISidebarProps {
  restaurants: Restaurant[];
}

export async function Sidebar({ restaurants }: ISidebarProps) {
  return (
    <div className="flex h-screen flex-col">
      <aside className="m-6 max-h-screen flex-1 overflow-hidden rounded-xl border bg-muted p-2">
        <div className="grid h-full grid-rows-11 gap-2">
          {restaurants.length === 0 && (
            <div className="flex items-center justify-center rounded-md border bg-background p-4 shadow-sm transition-shadow hover:shadow-md hover:shadow-black/5">
              <p className="text-center text-sm text-muted-foreground">
                You don't have any restaurants...
              </p>
            </div>
          )}
          {restaurants.map((restaurant) => (
            <Link
              className="flex items-center rounded-md border bg-background p-4 shadow-sm transition-shadow hover:shadow-md hover:shadow-black/5"
              href={`/admin/restaurant/${restaurant.id}`}
              key={restaurant.id}
            >
              <div className="flex items-center space-x-4">
                <Avatar className="size-7">
                  <AvatarImage src="" alt="" />
                  <AvatarFallback />
                </Avatar>

                <div className="flex flex-col space-y-0.5">
                  <p className="line-clamp-1 text-sm font-medium">
                    {restaurant.name}
                  </p>
                  <p className="line-clamp-1 text-sm text-muted-foreground">
                    {restaurant.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}

          <div className="flex items-center justify-center">
            <NewRestaurantDialog />
          </div>
        </div>
      </aside>
    </div>
  );
}
