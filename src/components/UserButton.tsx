"use client"

import { useSession } from "@/app/(main)/SessionProvider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu"
import UserAvatar from "./UserAvatar"
import Link from "next/link"
import { Check, LogOutIcon, Monitor, Moon, Sun, UserIcon } from "lucide-react"
import { logout } from "@/app/(auth)/actions"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import Checkmark from "./Checkmark"
import { useQueryClient } from "@tanstack/react-query"

interface UserButtonProps {
    className?: string
}

export default function UserButton({className}: UserButtonProps) {
    const {user} = useSession()

    const {theme, setTheme} = useTheme()

    const queryClient = useQueryClient()

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={cn("flex-none rounded-full border-none bg-transparent p-0 m-0 cursor-pointer focus:outline-none", className)}>
            <UserAvatar avatarUrl={user.avatarUrl} size={30} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div className="flex items-center space-x-2">
              {user.username}
              <Checkmark />
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={`/${user.username}`}>
            <DropdownMenuItem>
              <UserIcon className="mr-2 size-4" />
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Monitor className="mr-2 size-4" />
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="mr-2 size-4" />
                  System default
                  {theme === "system" && <Check className="ms-2 size-3" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 size-4" />
                  Light
                  {theme === "light" && <Check className="ms-2 size-3" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 size-4" />
                  Dark
                  {theme === "dark" && <Check className="ms-2 size-3" />}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              queryClient.clear();
              logout();
            }}
          >
            <LogOutIcon className="mr-2 size-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
}