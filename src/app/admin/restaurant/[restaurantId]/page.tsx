import { getRestaurantById } from "@/actions";
import { RestaurantForm } from "./_components/restaurant-from";

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
    <div className="m-6">
      <div className="mx-auto w-[768px] space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">
          {restaurant?.name}
        </h1>

        <div className="grid gap-2">
          <RestaurantForm restaurant={restaurant} />
        </div>
      </div>
    </div>
  );
}
