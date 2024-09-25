import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomeAltSlimHoriz } from 'iconoir-react';
import { BellNotification } from 'iconoir-react';
import { MessageAlert } from 'iconoir-react';
import { Bookmark } from 'iconoir-react';



interface MenuBarProps {
  className?: string;
}

export default function MenuBar({ className }: MenuBarProps) {
  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/">
          <HomeAltSlimHoriz height={25} width={25}/>
          <span className="hidden lg:inline text-lg">Home</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Notifications"
        asChild
      >
        <Link href="/notifications">
          <BellNotification height={25} width={25}/>
          <span className="hidden lg:inline text-lg">Notifications</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Messages"
        asChild
      >
        <Link href="/messages">
          <MessageAlert height={25} width={25}/>
          <span className="hidden lg:inline text-lg">Messages</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Bookmarks"
        asChild
      >
        <Link href="/bookmarks">
          <Bookmark height={25} width={25}/>
          <span className="hidden lg:inline text-lg">Bookmarks</span>
        </Link>
      </Button>
    </div>
  );
}
