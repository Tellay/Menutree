"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/server/auth";
import { db } from "@/server/db";

import { NewRestaurantFormSchemaType } from "@/app/admin/_components/new-restaurant-dialog";

export async function newRestaurant(data: NewRestaurantFormSchemaType) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("User not found");

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