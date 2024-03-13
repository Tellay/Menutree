"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Restaurant } from "@prisma/client";

import { editRestaurantById } from "@/actions";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  FaInstagram as Instagram,
  FaFacebook as Facebook,
  FaTiktok as TikTok,
} from "react-icons/fa";

interface RestaurantFormProps {
  restaurant: Restaurant;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required!").max(50, "Name is too long!"),
  description: z
    .string()
    .min(1, "Description is required!")
    .max(255, "Description is too long!"),
  instagramUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  tiktokUrl: z.string().optional(),
});

export type RestaurantFormSchemaType = z.infer<typeof formSchema>;

export function RestaurantForm({ restaurant }: RestaurantFormProps) {
  const form = useForm<RestaurantFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: restaurant.name,
      description: restaurant.description,
      instagramUrl: restaurant.instagramUrl || "",
      facebookUrl: restaurant.facebookUrl || "",
      tiktokUrl: restaurant.tiktokUrl || "",
    },
  });

  async function onSubmit(values: RestaurantFormSchemaType) {
    try {
      await editRestaurantById({ id: restaurant.id, data: values });
      toast.success("Restaurant edited successfully");
    } catch (error) {
      form.reset();
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

          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="instagramUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Instagram className="size-5" />
                    Instagram
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="spaghetti_house" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="facebookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Facebook className="size-5" />
                    Facebook
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="spaghetti_house" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tiktokUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <TikTok className="size-5" />
                    TikTok
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="spaghetti_house" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
