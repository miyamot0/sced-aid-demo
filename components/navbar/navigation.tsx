"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Settings2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { SettingsPageOption } from "../pages/settings/settings";
import { useQueryClient } from "@tanstack/react-query";
import { KEY_STORAGE } from "@/hooks/use-storage";

export function Navigation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  function handleNav(page: SettingsPageOption) {
    const path = `/settings?category=${page}`;
    queryClient.invalidateQueries({ queryKey: [KEY_STORAGE] });

    router.push(path);
  }

  return (
    <div className="w-full pt-4 flex flex-row justify-between">
      <NavigationMenu>
        <NavigationMenuList className="gap-2">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), "border")}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/dashboard" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), "border")}
              >
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/information" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), "border")}
              >
                Information
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="p-2 border rounded-lg bg-white">
            <Settings2Icon />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              handleNav("storage");
            }}
          >
            Data Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              handleNav("visuals");
            }}
          >
            Display Options
          </DropdownMenuItem>
          <DropdownMenuItem>Information</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
