import { Restaurant } from "@prisma/client";

import { getMealsByRestaurantId } from "@/actions";

import {
  InformationCard,
  InformationCardDescription,
  InformationCardFooter,
  InformationCardFooterText,
  InformationCardHeader,
  InformationCardTitle,
} from "./information-card";
import { EditMealDialog } from "./edit-meal-dialog";
import { AddMealForm } from "./add-meal-form";

import { Badge } from "@/components/ui/badge";

interface IAddMealsCardProps {
  restaurant: Restaurant;
}

export async function AddMealsCard({ restaurant }: IAddMealsCardProps) {
  const { id } = restaurant;

  const meals = await getMealsByRestaurantId(id);

  return (
    <InformationCard>
      <InformationCardHeader>
        <InformationCardTitle>Add Your Meals</InformationCardTitle>
        <InformationCardDescription>
          Add your meals, use the best images to make your menu look amazing.
        </InformationCardDescription>

        <div className="rounded-md border bg-background p-4">
          <div className="space-y-4">
            <div className="flex justify-end">
              <AddMealForm restaurant={restaurant} />
            </div>

            {meals.length === 0 && (
              <div className="flex items-center justify-center rounded-md py-2">
                <p className="text-sm text-muted-foreground">
                  You don't have any meals yet...
                </p>
              </div>
            )}
            {meals.map((meal) => (
              <div className="rounded-md border p-3" key={meal.id}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex w-full justify-between">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-base font-semibold">{meal.name}</h4>
                        <Badge
                          variant={meal.published ? "default" : "outline"}
                          className="text-xs"
                        >
                          {meal.published ? "Published" : "Not published"}
                        </Badge>
                      </div>

                      <EditMealDialog meal={meal} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {meal.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </InformationCardHeader>
      <InformationCardFooter>
        <InformationCardFooterText>
          Do the best you can to make your menu look amazing.
        </InformationCardFooterText>
      </InformationCardFooter>
    </InformationCard>
  );
}
