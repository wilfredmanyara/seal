import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomeAltSlimHoriz } from 'iconoir-react';
import { BellNotification } from 'iconoir-react';
import { MessageAlert } from 'iconoir-react';
import { Bookmark } from 'iconoir-react';
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import NotificationsButton from "./NotificationsButton";
import MessagesButton from "./MessagesButton";
import streamServerClient from "@/lib/stream";



interface MenuBarProps {
  className?: string;
}

export default async function MenuBar({ className }: MenuBarProps) {
  const {user} = await validateRequest()

  if (!user) return null

  const [unreadNotificationCount, unreadMessagesCount] = await Promise.all([
    prisma.notification.count({
      where: {
        recipientId: user.id,
        read: false,
      }
    }),
    (await streamServerClient.getUnreadCount(user.id)).total_unread_count
  ])

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
      <MessagesButton initialState={{ unreadCount: unreadMessagesCount }} />
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
