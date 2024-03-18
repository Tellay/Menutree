"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  FaInstagram as Instagram,
  FaFacebook as Facebook,
  FaTiktok as TikTok,
} from "react-icons/fa";
import { AiOutlineLoading3Quarters as Loading } from "react-icons/ai";
import { FaCloudUploadAlt as Upload } from "react-icons/fa";

import { Restaurant } from "@prisma/client";

import { editRestaurantById } from "@/actions";

import {
  InformationCard,
  InformationCardDescription,
  InformationCardFooter,
  InformationCardFooterText,
  InformationCardHeader,
  InformationCardTitle,
} from "./information-card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UploadButton, UploadDropzone } from "@/lib/utils";
import { AvatarUpload } from "./avatar-upload";

interface RestaurantFormProps {
  restaurant: Restaurant;
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Please provide a name for your restaurant!")
    .max(50, "The name you provided is too long!"),
  description: z
    .string()
    .min(1, "Plese provide a description for your restaurant!")
    .max(255, "The description you provided is too long!"),
  instagramUrl: z
    .string()
    .max(40, "The username you provided is too long!")
    .optional(),
  facebookUrl: z
    .string()
    .max(40, "The username you provided is too long!")
    .optional(),
  tiktokUrl: z
    .string()
    .max(40, "The  username you provided is too long!")
    .optional(),
  avatarUrl: z.string().optional(),
});

export type RestaurantFormSchemaType = z.infer<typeof formSchema>;

export function RestaurantForm({ restaurant }: RestaurantFormProps) {
  const { name, description, instagramUrl, facebookUrl, tiktokUrl, avatarUrl } =
    restaurant;

  const form = useForm<RestaurantFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      description,
      instagramUrl: instagramUrl || "",
      facebookUrl: facebookUrl || "",
      tiktokUrl: tiktokUrl || "",
      avatarUrl: avatarUrl || "",
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
          className="space-y-6"
        >
          <AvatarUpload form={form} />

          <InformationCard>
            <InformationCardHeader>
              <InformationCardTitle>Name</InformationCardTitle>
              <InformationCardDescription>
                Enter the name of your restaurant.
              </InformationCardDescription>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </InformationCardHeader>
            <InformationCardFooter>
              <InformationCardFooterText>
                Please use 50 characters at maximum.
              </InformationCardFooterText>
            </InformationCardFooter>
          </InformationCard>

          <InformationCard>
            <InformationCardHeader>
              <InformationCardTitle>Description</InformationCardTitle>
              <InformationCardDescription>
                Enter the description of your restaurant.
              </InformationCardDescription>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="h-[80px]"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </InformationCardHeader>
            <InformationCardFooter>
              <InformationCardFooterText>
                Please use 255 characters at maximum.
              </InformationCardFooterText>
            </InformationCardFooter>
          </InformationCard>

          <InformationCard>
            <InformationCardHeader>
              <InformationCardTitle>Social Medias</InformationCardTitle>
              <InformationCardDescription>
                Add your social medias links. This is where your customers can
                follow you to stay updated.
              </InformationCardDescription>

              <div className="grid grid-cols-3 gap-3 rounded-md border bg-background p-4">
                <FormField
                  control={form.control}
                  name="instagramUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Instagram className="size-5" />
                        Instagram
                      </FormLabel>
                      <FormControl>
                        <Input
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
                  name="facebookUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Facebook className="size-5" />
                        Facebook
                      </FormLabel>
                      <FormControl>
                        <Input
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
                  name="tiktokUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm text-muted-foreground">
                        <TikTok className="size-5" />
                        TikTok
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={form.formState.isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </InformationCardHeader>
            <InformationCardFooter>
              <InformationCardFooterText>
                Please use the just the username.
              </InformationCardFooterText>
            </InformationCardFooter>
          </InformationCard>

          <InformationCard>
            <InformationCardHeader>
              <InformationCardTitle>Save</InformationCardTitle>
              <InformationCardDescription>
                Save your changes to your restaurant.
              </InformationCardDescription>
            </InformationCardHeader>
            <InformationCardFooter className="justify-between">
              <InformationCardFooterText>
                Make as many changes as you need.
              </InformationCardFooterText>
              <Button disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loading className="mr-2 size-4 animate-spin" />
                )}
                Save
              </Button>
            </InformationCardFooter>
          </InformationCard>
        </form>
      </Form>
    </div>
  );
}
