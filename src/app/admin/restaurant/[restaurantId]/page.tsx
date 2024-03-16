import { MdError as Error } from "react-icons/md";

import { checkIfUserOwnsRestaurantById } from "@/actions";

import {
  InformationCard,
  InformationCardHeader,
  InformationCardTitle,
  InformationCardDescription,
  InformationCardFooter,
} from "./_components/information-card";
import { DeleteConfirmationDialog } from "./_components/delete-confirmation-dialog";
import { Separator } from "@/components/ui/separator";
import { RestaurantForm } from "./_components/restaurant-form";
import { AddMealsCard } from "./_components/add-meals-card";

export default async function RestaurantPage({
  params,
}: {
  params: { restaurantId: string };
}) {
  const { restaurantId } = params;

  const restaurant = await checkIfUserOwnsRestaurantById(restaurantId);
  if (!restaurant) {
    return (
      <div className="mx-auto flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Error className="size-6 text-destructive" />
          <p className="text-sm text-destructive">
            This restaurant doesn't exist or you don't own it!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-[912px] space-y-10 p-6">
      <h1 className="text-3xl font-medium tracking-tight">{restaurant.name}</h1>

      <div className="grid gap-8">
        <RestaurantForm restaurant={restaurant} />

        <Separator className="my-6" orientation="horizontal" />

        <AddMealsCard restaurant={restaurant} />

        <InformationCard className="border-destructive">
          <InformationCardHeader>
            <InformationCardTitle>Delete Restaurant</InformationCardTitle>
            <InformationCardDescription>
              Permanently delete this restaurant and all of its data from our
              servers, this action cannot be undone, please proceed with
              caution.
            </InformationCardDescription>
          </InformationCardHeader>
          <InformationCardFooter className="justify-end">
            <DeleteConfirmationDialog restaurant={restaurant} />
          </InformationCardFooter>
        </InformationCard>
      </div>
    </div>
  );
}
