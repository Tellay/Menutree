"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters as Loading } from "react-icons/ai";
import { FaPlus as Plus } from "react-icons/fa6";

import { newRestaurant } from "@/actions";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// TODO - Check the names is diffrente that Null, Undefined, 404
export const formSchema = z.object({
  name: z
    .string()
    .min(1, "Please provide a name for your restaurant!")
    .max(50, "The name you provided is too long!"),
  description: z
    .string()
    .min(1, "Plese provide a description for your restaurant!")
    .max(255, "The description you provided is too long!"),
});

export type NewRestaurantFormSchemaType = z.infer<typeof formSchema>;

export function NewRestaurantDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<NewRestaurantFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: NewRestaurantFormSchemaType) {
    try {
      await newRestaurant(values);
      toast.success("Restaurant created successfully");
    } catch (error) {
      toast.error("Failed to create restaurant");
    } finally {
      form.reset();
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full hover:shadow-md" size="icon">
          <Plus className="size-4" />
          <span className="sr-only">New restaurant</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[480px] sm:rounded-xl">
        <DialogHeader>
          <DialogTitle>New restaurant</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
                  <FormLabel>Description</FormLabel>
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

            <div className="flex flex-1 justify-between">
              <DialogClose asChild>
                <Button
                  disabled={form.formState.isSubmitting}
                  variant="outline"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loading className="mr-2 size-4 animate-spin" />
                )}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
