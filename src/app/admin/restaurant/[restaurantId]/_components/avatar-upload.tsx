"use client";

import { UploadButton } from "@/lib/utils";

import {
  InformationCard,
  InformationCardHeader,
  InformationCardTitle,
  InformationCardDescription,
  InformationCardFooter,
  InformationCardFooterText,
} from "./information-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export function AvatarUpload() {
  return (
    <InformationCard>
      <InformationCardHeader>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <InformationCardTitle>Avatar</InformationCardTitle>
            <InformationCardDescription>
              This is the avatar of your restaurant. Click on the avatar to
              upload your restaurant avatar.
            </InformationCardDescription>
          </div>

          <Avatar className="size-[78px]">
            <AvatarImage />
            <AvatarFallback />
          </Avatar>
        </div>
        <UploadButton
          className="h-[98px] rounded-md border border-dashed bg-background p-3 text-sm text-muted-foreground"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // form.setValue("avatarUrl", res[0].url);
          }}
          onUploadError={(error: Error) => {
            toast.error("Failed to upload avatar");
          }}
        />
      </InformationCardHeader>
      <InformationCardFooter>
        <InformationCardFooterText>
          Use your best photo.
        </InformationCardFooterText>
      </InformationCardFooter>
    </InformationCard>
  );
}
