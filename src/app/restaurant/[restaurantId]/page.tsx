import Link from "next/link";
import { MdError as Error } from "react-icons/md";
import {
  FaInstagram as Instagram,
  FaFacebook as Facebook,
  FaTiktok as TikTok,
} from "react-icons/fa";

import { auth } from "@/server/auth";
import { addVisitById, getRestaurantById } from "@/actions";

import { Button } from "@/components/ui/button";
import { cn, formatNumber } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ShareDialog } from "./_components/share-dialog";
import { MealImage } from "./_components/meal-image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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

  await addVisitById(restaurantId);

  const {
    name,
    avatarUrl,
    totalVisits,
    instagramUrl,
    facebookUrl,
    tiktokUrl,
    description,
    meals,
  } = restaurant;

  return (
    <div className="container space-y-12 py-12">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-3">
            <Avatar
              className={cn("size-[102px] border", !avatarUrl && "hidden")}
            >
              <AvatarImage src={avatarUrl || ""} />
              <AvatarFallback />
            </Avatar>
            <h1 className="text-4xl font-semibold tracking-tight">{name}</h1>
          </div>

          <div className="flex h-[40px] items-center gap-4">
            <div className="flex flex-col items-center">
              <strong className="text-sm font-medium">
                {formatNumber({ number: totalVisits, notation: "compact" })}{" "}
              </strong>
              <span className="text-sm text-muted-foreground">
                Total {totalVisits === 1 ? "visit" : "visits"}
              </span>
            </div>

            {(instagramUrl || facebookUrl || tiktokUrl) && (
              <>
                <Separator orientation="vertical" />
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-3">
                    {instagramUrl && (
                      <Link
                        className="transition-colors hover:text-foreground/90"
                        href={`https://www.instagram.com/${instagramUrl}`}
                        target="_blank"
                      >
                        <Instagram className="size-5" />
                      </Link>
                    )}
                    {facebookUrl && (
                      <Link
                        className="transition-colors hover:text-foreground/90"
                        href={`https://www.facebook.com/${facebookUrl}`}
                        target="_blank"
                      >
                        <Facebook className="size-5" />
                      </Link>
                    )}
                    {tiktokUrl && (
                      <Link
                        className="transition-colors hover:text-foreground/90"
                        href={`https://www.tiktok.com/@${tiktokUrl}`}
                        target="_blank"
                      >
                        <TikTok className="size-5" />
                      </Link>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="border-t py-6">
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
            <div className="space-y-3" key={meal.id}>
              {!meal.avatarUrl ? (
                <div className="flex aspect-video items-center justify-center rounded-md bg-muted text-muted-foreground">
                  No photo
                </div>
              ) : (
                <MealImage img={meal.avatarUrl} alt={meal.name} />
              )}
              {/* <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
              {/* </div> */}

              <div className="flex flex-col justify-between space-y-2">
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
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {meal.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
