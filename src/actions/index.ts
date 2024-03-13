"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/server/auth";
import { db } from "@/server/db";

import { NewRestaurantFormSchemaType } from "@/app/admin/_components/new-restaurant-dialog";

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

    if (totalRestaurants + 1 > 10) {
      throw new Error("You can only have up to 10 restaurants");
    }

    await db.restaurant.create({
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

    revalidatePath("/admin", "page");
  } catch (error) {
    console.error("Error adding new restaurant", error);
    throw error;
  }
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
        }
      },
      data,
    });

    revalidatePath("/admin/restaurant/[restaurantId]", "page");
  } catch (error) {
    console.error("Error editing estaurant", error);
    throw error;
  }
}

export async function deleteRestaurant(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("User not found");

    await db.restaurant.delete({
      where: {
        id,
        createdBy: {
          id: session.user.id,
        },
      }
    });

    revalidatePath("/admin", "page");
  } catch (error) {
    console.error("Error deleting restaurant", error);
    throw error;
  }
}
