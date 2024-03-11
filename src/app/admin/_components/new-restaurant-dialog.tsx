"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AiOutlineLoading3Quarters as Loading } from "react-icons/ai";
import { FaCirclePlus as PlusCircleFilled } from "react-icons/fa6";
import { FiPlusCircle as PlusCircle } from "react-icons/fi";

import { newRestaurant } from "@/actions";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

export const formSchema = z.object({
  name: z.string().min(1, "Name is required!").max(50, "Name is too long!"),
  description: z
    .string()
    .min(1, "Description is required!")
    .max(255, "Description is too long!"),
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
        <Button
          className="text-primary-foreground hover:text-secondary/90"
          variant="link"
          size="icon"
        >
          <PlusCircleFilled className="size-5" />
          <span className="sr-only">New restaurant</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New restaurant</DialogTitle>
        </DialogHeader>
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
                    <Input
                      placeholder="Spaghetti House"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
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
                    <Input
                      placeholder="A very lovely restaurant with a great team."
                      disabled={form.formState.isSubmitting}
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

            <div className="flex justify-end">
              <div className="flex items-center gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>

                <Button className="gap-3" type="submit">
                  {!form.formState.isSubmitting ? (
                    <PlusCircle className="size-4" />
                  ) : (
                    <Loading className="size-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
