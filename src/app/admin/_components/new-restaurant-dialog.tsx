import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FiPlusCircle as PlusCircle } from "react-icons/fi";

export async function NewRestaurantDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-3" variant="outline">
          <PlusCircle className="size-4" />
          New restaurant
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
