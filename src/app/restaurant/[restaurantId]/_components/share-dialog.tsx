"use client";

import { IoMdShare as Share } from "react-icons/io";
import { QRCodeSVG } from "qrcode.react";

import { Restaurant } from "@prisma/client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface IShareDialogProps {
  restaurant: Restaurant;
}

export function ShareDialog({ restaurant }: IShareDialogProps) {
  const { id, name } = restaurant;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2" variant="secondary">
          <Share className="size-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <div className="space-y-6">
          <h4 className="text-center text-xl font-semibold tracking-tight">
            Sharing {name}
          </h4>

          <div className="mx-auto w-fit rounded-md bg-white p-2">
            <QRCodeSVG
              size={200}
              value={`${process.env.NEXT_PUBLIC_URL}/restaurant/${id}`}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
