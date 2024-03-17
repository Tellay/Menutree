import Link from "next/link";

import {
  FaInstagram as Instagram,
  FaFacebook as Facebook,
  FaTiktok as TikTok,
} from "react-icons/fa";
import { MdError as Error } from "react-icons/md";

import { auth } from "@/server/auth";
import { addVisitById, getRestaurantById } from "@/actions";
import { formatNumber } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ShareDialog } from "./_components/share-dialog";
import { toast } from "sonner";

export default async function RestaurantPage({
  params,
}: {
  params: { restaurantId: string };
}) {
  const session = await auth();

  const { restaurantId } = params;
  const restaurant = await getRestaurantById(restaurantId);
  if (!restaurant) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Error className="size-6 text-destructive" />
          <p className="text-sm text-destructive">
            This restaurant doesn't exist!
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" asChild>
              <Link href="/">Go to home page</Link>
            </Button>

            {!session && (
              <Button variant="outline" asChild>
                <Link href="/auth">Go to auth page</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const {
    id,
    name,
    description,
    totalVisits,
    instagramUrl,
    facebookUrl,
    tiktokUrl,
    meals,
  } = restaurant;

  await addVisitById(id);

  return (
    <div>
      <div className="container space-y-12 py-12">
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-medium tracking-tight">{name}</h1>

          <div className="flex h-[56px] items-center space-x-4">
            <div className="flex flex-col items-center space-y-0.5">
              <h4 className="font-medium">
                {formatNumber({ number: totalVisits, notation: "compact" })}
              </h4>
              <p className="text-muted-foreground">Total visits</p>
            </div>

            <Separator orientation="vertical" />

            <div className="flex items-center space-x-3">
              {instagramUrl && (
                <Link
                  className="transition-colors hover:text-foreground/90"
                  href={`https://www.instagram.com/${instagramUrl}`}
                  target="_blank"
                >
                  <Instagram className="size-6" />
                </Link>
              )}

              {facebookUrl && (
                <Link
                  className="transition-colors hover:text-foreground/90"
                  href={`https://www.facebook.com/${facebookUrl}`}
                  target="_blank"
                >
                  <Facebook className="size-6" />
                </Link>
              )}

              {tiktokUrl && (
                <Link
                  className="transition-colors hover:text-foreground/90"
                  href={`https://www.tiktok.com/@${tiktokUrl}`}
                  target="_blank"
                >
                  <TikTok className="size-6" />
                </Link>
              )}
            </div>
          </div>

          <p className="text-muted-foreground">{description}</p>

          <div className="space-x-2 border-t py-4">
            <ShareDialog restaurant={restaurant} />
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-medium">Avaliable meals</h4>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {meals.length === 0 && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <p className="text-center text-sm text-muted-foreground">
                  This restaurant doesn't have any meals yet...
                </p>
              </div>
            )}
            {meals.map((meal) => (
              <div className="space-y-3 rounded-md" key={meal.id}>
                <div className="aspect-video animate-pulse rounded-md bg-secondary" />

                <div className="flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">{meal.name}</h5>
                    <span className="text-sm font-medium">
                      {formatNumber({
                        number: meal.price,
                        notation: "standard",
                      })}
                      €
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
