import { getRestaurantById } from "@/actions";
import { RestaurantForm } from "./_components/restaurant-form";
import { DeleteConfirmationDialog } from "./_components/delete-confirmation-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InformationCard,
  InformationCardDescription,
  InformationCardFooter,
  InformationCardFooterText,
  InformationCardHeader,
  InformationCardTitle,
} from "./_components/information-card";
import { Textarea } from "@/components/ui/textarea";

export default async function RestaurantPage({
  params,
}: {
  params: { restaurantId: string };
}) {
  const { restaurantId } = params;

  const restaurant = await getRestaurantById(restaurantId);
  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div className="mx-auto w-[912px] space-y-10 p-6">
      <h1 className="text-3xl font-medium tracking-tight">{restaurant.name}</h1>

      <div className="grid gap-8">
        <InformationCard>
          <InformationCardHeader>
            <InformationCardTitle>Avatar</InformationCardTitle>
            <InformationCardDescription>
              This is the avatar of your restaurant. Click on the avatar to
              upload your restaurant avatar.
            </InformationCardDescription>
          </InformationCardHeader>
          <InformationCardFooter>
            <InformationCardFooterText>
              Please use 50 characters at maximum.
            </InformationCardFooterText>
          </InformationCardFooter>
        </InformationCard>

        <InformationCard>
          <InformationCardHeader>
            <InformationCardTitle>Name</InformationCardTitle>
            <InformationCardDescription>
              Enter the name of your restaurant.
            </InformationCardDescription>

            <Input className="w-[400px]" />
          </InformationCardHeader>
          <InformationCardFooter>
            <InformationCardFooterText>
              Please use 50 characters at maximum.
            </InformationCardFooterText>
          </InformationCardFooter>
        </InformationCard>

        <InformationCard>
          <InformationCardHeader>
            <InformationCardTitle>Description</InformationCardTitle>
            <InformationCardDescription>
              Enter the description of your restaurant.
            </InformationCardDescription>

            <Textarea className="h-[138px] w-[400px]" />
          </InformationCardHeader>
          <InformationCardFooter>
            <InformationCardFooterText>
              Please use 255 characters at maximum.
            </InformationCardFooterText>
          </InformationCardFooter>
        </InformationCard>

        <InformationCard>
          <InformationCardHeader>
            <InformationCardTitle>Social Medias</InformationCardTitle>
            <InformationCardDescription>
              <InformationCardDescription>
                Add your social medias links. This is where your customers can
                follow you to stay updated.
              </InformationCardDescription>
            </InformationCardDescription>
          </InformationCardHeader>
          <InformationCardFooter>
            <InformationCardFooterText>
              Social medias are optional but strongly recommended.
            </InformationCardFooterText>
          </InformationCardFooter>
        </InformationCard>

        <InformationCard>
          <InformationCardHeader>
            <InformationCardTitle>Add your meals</InformationCardTitle>
            <InformationCardDescription>
              <InformationCardDescription>
                Add your meals, use the best images to make your menu look
                amazing.
              </InformationCardDescription>
            </InformationCardDescription>
          </InformationCardHeader>
          <InformationCardFooter>
            <InformationCardFooterText>
              Do the best you can to make your menu look amazing.
            </InformationCardFooterText>
          </InformationCardFooter>
        </InformationCard>

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
