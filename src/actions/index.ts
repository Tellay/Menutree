"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/server/auth";
import { db } from "@/server/db";

import { NewRestaurantFormSchemaType } from "@/app/admin/_components/new-restaurant-dialog";
import { redirect } from "next/navigation";

export async function getRestraurantsCreatedByCurrentUser() {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("User not found");

    const restaurants = await db.restaurant.findMany({
      where: {
        createdBy: {
          id: session.user.id,
        },
      },
    });

    return restaurants;
  } catch (error) {
    console.error("Error getting restaurants", error);
    throw error;
  }
}

export async function newRestaurant(data: NewRestaurantFormSchemaType) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("User not found");

    const totalRestaurants = await db.restaurant.count({
      where: {
        createdBy: {
          id: session.user.id,
        },
      },
    });

    if (totalRestaurants + 1 > 9) {
      throw new Error("You can only have up to 9 restaurants");
    }

    var restaurant = await db.restaurant.create({
      data: {
        name: data.name,
        description: data.description,
        createdBy: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error adding new restaurant", error);
    throw error;
  }
  revalidatePath("/admin", "page");
  redirect(`/admin/restaurant/${restaurant.id}`);
}

export async function getRestaurantById(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("User not found");

    const restaurant = await db.restaurant.findUnique({
      where: {
        id,
      },
    });

    return restaurant;
  } catch (error) {
    console.error("Error adding new restaurant", error);
    throw error;
  }
}

interface EditRestaurantByIdProps {
  id: string;
  data: {
    name: string;
    description: string;
    instagramUrl?: string;
    facebookUrl?: string;
    tiktokUrl?: string;
  };
}

export async function editRestaurantById({
  id,
  data,
}: EditRestaurantByIdProps) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("User not found");

    await db.restaurant.update({
      where: {
        id,
        createdBy: {
          id: session.user.id,
        },
      },
      data,
    });

    revalidatePath("/admin/restaurant/[restaurantId]", "page");
  } catch (error) {
    console.error("Error editing estaurant", error);
    throw error;
  }
}

export async function deleteRestaurantById(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("User not found");

    await db.restaurant.delete({
      where: {
        id,
        createdBy: {
          id: session.user.id,
        },
      },
    });
  } catch (err) {
    console.error("Error deleting restaurant", err);
    throw err;
  }

  revalidatePath("/admin", "page");
  redirect("/admin");
}

export async function checkIfUserOwnsRestaurantById(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("User not found");

    const restaurant = await db.restaurant.findUnique({
      where: {
        id,
        createdBy: {
          id: session.user.id,
        },
      },
    });

    if (!restaurant) {
      throw new Error("User does not own this restaurant");
    }

    return restaurant;
  } catch (error) {
    console.error("Error checking if user owns restaurant", error);
    return false;
  }
}

export async function changeRestaurantNameById(id: string, newName: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("User not found");

    const restaurant = await db.restaurant.update({
      where: {
        id,
        createdBy: {
          id: session.user.id,
        },
      },
      data: {
        name: newName,
      },
    });

    return restaurant;
  } catch (error) {
    console.error("Error changing restaurant name", error);
    throw error;
  }
}

export async function getMealsByRestaurantId(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("User not found");

    const meals = await db.meal.findMany({
      where: {
        restaurantId: id,
      },
    });

    return meals;
  } catch (error) {
    console.error("Error getting meals", error);
    throw error;
  }
}

interface IAddMealToRestaurantProps {
  restaurantId: string;
  data: {
    name: string;
    description: string;
    price: number;
    published: boolean;
  };
}

export async function addMealToRestaurantId({
  restaurantId,
  data,
}: IAddMealToRestaurantProps) {
  const { name, description, price, published } = data;

  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("User not found");

    const meal = await db.meal.create({
      data: {
        name,
        description,
        price,
        published,
        restaurantId,
      },
    });

    revalidatePath("/admin/restaurant/[restaurantId]", "page");
    return meal;
  } catch (error) {
    console.error("Error adding meal to restaurant", error);
    throw error;
  }
}

interface IEditMealProps {
  mealId: string;
  data: {
    name: string;
    description: string;
    price: number;
    published: boolean;
  };
}

export async function editMealById({ mealId, data }: IEditMealProps) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("User not found");

    await db.meal.update({
      where: {
        id: mealId,
      },
      data,
    });

    revalidatePath("/admin/restaurant/[restaurantId]", "page");
  } catch (error) {
    console.error("Error editing meal", error);
    throw error;
  }
}

export async function deleteMealById(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("User not found");

    await db.meal.delete({
      where: {
        id,
      },
    });
  } catch (err) {
    console.error("Error deleting meal", err);
    throw err;
  }
}
