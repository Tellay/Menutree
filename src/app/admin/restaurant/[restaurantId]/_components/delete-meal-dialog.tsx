"use client";

import { useState } from "react";
import { AiOutlineLoading3Quarters as Loading } from "react-icons/ai";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { deleteMealById } from "@/actions";
import { Meal } from "@prisma/client";
import { toast } from "sonner";

interface IDeleteMealDialogProps {
  meal: Meal;
}

export function DeleteMealDialog({ meal }: IDeleteMealDialogProps) {
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);

  const { id } = meal;

  async function handleDelete() {
    try {
      setIsLoading(true);
      await deleteMealById(id);
      toast.success("Meal deleted successfully");
    } catch (err) {
      toast.error("Failed to delete meal");
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex justify-end">
          <Button variant="destructive" type="button">
            Delete
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Meal</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your meal
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-between">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            {loading && <Loading className="mr-2 size-4 animate-spin" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
