import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomeAltSlimHoriz } from 'iconoir-react';
import { BellNotification } from 'iconoir-react';
import { MessageAlert } from 'iconoir-react';
import { Bookmark } from 'iconoir-react';
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import NotificationsButton from "./NotificationsButton";



interface MenuBarProps {
  className?: string;
}

export default async function MenuBar({ className }: MenuBarProps) {
  const {user} = await validateRequest()

  if (!user) return null

  const unreadNotificationCount = await prisma.notification.count({
    where: {
      recipientId: user.id,
      read: false,
    }
  })

  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/">
          <HomeAltSlimHoriz height={25} width={25} />
          <span className="hidden text-lg lg:inline">Home</span>
        </Link>
      </Button>
      <NotificationsButton
        initialState={{ unreadCount: unreadNotificationCount }}
      />
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Messages"
        asChild
      >
        <Link href="/messages">
          <MessageAlert height={25} width={25} />
          <span className="hidden text-lg lg:inline">Messages</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Bookmarks"
        asChild
      >
        <Link href="/bookmarks">
          <Bookmark height={25} width={25} />
          <span className="hidden text-lg lg:inline">Bookmarks</span>
        </Link>
      </Button>
    </div>
  );
}
