"use client";

import { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { GrEdit as Edit } from "react-icons/gr";
import { AiOutlineLoading3Quarters as Loading } from "react-icons/ai";
import { IoMdCloudUpload as Upload } from "react-icons/io";

import { Meal } from "@prisma/client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { editMealById } from "@/actions";

import { DeleteMealDialog } from "./delete-meal-dialog";
import { UploadButton } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

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
  avatarUrl: z.string().optional(),
});

export type EditMealFormSchemaType = z.infer<typeof formSchema>;

interface IEditMealDialogProps {
  meal: Meal;
}

export function EditMealDialog({ meal }: IEditMealDialogProps) {
  const [open, setIsOpen] = useState(false);

  const { id, name, description, price, published, avatarUrl } = meal;

  const form = useForm<EditMealFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      description,
      price: price,
      published: published,
      avatarUrl: avatarUrl || "",
    },
  });

  async function onSubmit(values: EditMealFormSchemaType) {
    try {
      await editMealById({
        mealId: id,
        data: values,
      });

      toast.success("Meal edited successfully");
    } catch (error) {
      form.reset();
      toast.error("Failed to edit meal");
    } finally {
      setIsOpen(false);
    }
  }

  const imgPreview = form.watch("avatarUrl");

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="size-8" variant="secondary" size="icon">
          <Edit className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[500px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Meal</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => onSubmit(data))}
            className="space-y-6"
          >
            {!imgPreview ? (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Upload className="size-5" />
                Upload a photo to see preview
              </div>
            ) : (
              <div className="relative h-[230px] overflow-hidden rounded-md bg-muted">
                <Image
                  className="object-cover"
                  src={imgPreview}
                  alt="Image preview"
                  fill
                />
              </div>
            )}

            <UploadButton
              className="h-[98px] rounded-md border border-dashed bg-background p-3 text-xs text-muted-foreground"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                form.setValue("avatarUrl", res[0].url);
              }}
              onUploadError={(error: Error) => {
                toast.error("Failed to upload avatar");
              }}
            />
            {/* <AvatarUpload form={form} /> */}

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

            <div className="space-y-4 rounded-md border border-destructive p-4">
              <div className="space-y-0.5">
                <h4 className="text-sm font-semibold">
                  Want do delete this meal?
                </h4>
                <p className="text-xs text-muted-foreground">
                  This action cannot be undone. Proceed with caution.
                </p>
              </div>

              <DeleteMealDialog meal={meal} />
            </div>

            <div className="flex flex-1 justify-between">
              <DialogClose disabled={form.formState.isSubmitting} asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loading className="mr-2 size-4 animate-spin" />
                )}
                Edit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
