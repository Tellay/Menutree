"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Restaurant } from "@prisma/client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { editRestaurantById } from "@/actions";
import { toast } from "sonner";

interface RestaurantFormProps {
  restaurant: Restaurant;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required!").max(50, "Name is too long!"),
  description: z
    .string()
    .min(1, "Description is required!")
    .max(255, "Description is too long!"),
});

export type RestaurantFormSchemaType = z.infer<typeof formSchema>;

export function RestaurantForm({ restaurant }: RestaurantFormProps) {
  const form = useForm<RestaurantFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: restaurant.name,
      description: restaurant.description,
    },
  });

  async function onSubmit(values: RestaurantFormSchemaType) {
    try {
      await editRestaurantById({ id: restaurant.id, data: values });
      toast.success("Restaurant edited successfully");
    } catch (error) {
      toast.error("Failed to edit restaurant");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => onSubmit(data))}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Spaghetti House" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="max-h-[80px]"
                    placeholder="A very lovely restaurant with a great team."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display description.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
