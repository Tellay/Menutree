"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FaPlus as Plus } from "react-icons/fa6";
import { AiOutlineLoading3Quarters as Loading } from "react-icons/ai";

import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { addMealToRestaurantId } from "@/actions";
import { Restaurant } from "@prisma/client";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Please provide a name for your meal!")
    .max(50, "The name you provided is too long!"),
  description: z
    .string()
    .min(1, "Please provide a description for your meal!")
    .max(255, "The description you provided is too long!"),
  price: z.coerce
    .number({ required_error: "Please provide a price for your meal!" })
    .positive("Price must be a positive number!"),
  published: z.coerce.boolean(),
});

export type AddMealFormSchemaType = z.infer<typeof formSchema>;

interface IAddMealFormProps {
  restaurant: Restaurant;
}

export function AddMealForm({ restaurant }: IAddMealFormProps) {
  const [open, setIsOpen] = useState(false);
  const form = useForm<AddMealFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      published: false,
    },
  });

  async function onSubmit(values: AddMealFormSchemaType) {
    try {
      await addMealToRestaurantId({
        restaurantId: restaurant.id,
        data: values,
      });

      toast.success("Meal add successfully");
    } catch (error) {
      toast.error("Failed to add meal");
    } finally {
      setIsOpen(false);
      form.reset();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" variant="outline">
          <Plus className="size-4" />
          Add Meal
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[480px]">
        <DialogHeader>
          <DialogTitle>Add Meal</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => onSubmit(data))}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter the name of your meal</FormLabel>
                  <FormControl>
                    <Input disabled={form.formState.isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter the description of your meal</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-[138px]"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter the price of your meal</FormLabel>
                  <FormControl>
                    <Input
                      className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      type="number"
                      inputMode="decimal"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="rounded-md border p-4">
              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex justify-between">
                    <div className="flex flex-col space-y-1">
                      <FormLabel className="text-sm text-primary">
                        Will the meal be published?
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">
                        This controls if the meal will be visible for users or
                        not.
                      </p>
                    </div>
                    <FormControl className="m-0">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-1 justify-between">
              <DialogClose disabled={form.formState.isSubmitting} asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loading className="mr-2 size-4 animate-spin" />
                )}
                Add
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
