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
