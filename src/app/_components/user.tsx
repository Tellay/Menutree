import { AiOutlineShop as Restaurants } from "react-icons/ai";

import { auth } from "@/server/auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { UserSignOut } from "./user-signout";

export async function User() {
  const session = await auth();

  const getFirstLetterOfName = (name: string) => {
    const names = name.split(" ");
    const firstName = names[0];
    return firstName.charAt(0).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-8">
          <AvatarImage src={session?.user?.image || ""} />
          <AvatarFallback>
            {getFirstLetterOfName(session?.user?.name || "")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer gap-2" asChild>
          <Link href="/admin">
            <Restaurants className="size-4" />
            Restaurants
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <UserSignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
