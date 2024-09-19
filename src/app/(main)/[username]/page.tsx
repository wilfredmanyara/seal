import { validateRequest } from "@/auth";
import Checkmark from "@/components/Checkmark";
import FollowButton from "@/components/FollowButton";
import FollowerCount from "@/components/FollowerCount";
import TrendsSidebar from "@/components/TrendsSidebar";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { FollowerInfo, UserData, getUserDataSelect } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { formatDate } from "date-fns";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import UserPosts from "./UserPosts";
import { CalendarDays } from "lucide-react";

interface PageProps {
  params: { username: string };
}

const getUser = cache(async (username: string, loggedinUserId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: getUserDataSelect(loggedinUserId),
  });

  if (!user) notFound();

  return user;
});

export async function generateMetadata({
  params: { username },
}: PageProps): Promise<Metadata> {
  const { user: loggedinUser } = await validateRequest();

  if (!loggedinUser) return {};

  const user = await getUser(username, loggedinUser.id);

  return {
    title: `${user.displayName} (@${user.username})`,
  };
}

export default async function Page({ params: { username } }: PageProps) {
  const { user: loggedinUser } = await validateRequest();

  if (!loggedinUser) {
    return (
      <p className="text-destructive">
        You are not authorised to view this page.
      </p>
    );
  }

  const user = await getUser(username, loggedinUser.id);

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <UserProfile user={user} loggedInUserId={loggedinUser.id} />
        <UserPosts userId={user.id} />
      </div>
      <TrendsSidebar />
    </main>
  );
}

interface UserProfileProps {
    user: UserData;
    loggedInUserId: string;
}

async function UserProfile({user, loggedInUserId}: UserProfileProps) {
    const followerInfo: FollowerInfo = {
        followers: user._count.followers,
        isFollowedByUser: user.followers.some(
            ({followerId}) => followerId === loggedInUserId
        )
    }

    return (
      <div className="h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
        <UserAvatar
          avatarUrl={user.avatarUrl}
          size={250}
          className="mx-auto size-full max-h-60 max-w-60 rounded-full"
        />
        <div className="flex flex-wrap gap-3 sm:flex-nowrap">
            <div className="me-auto space-y-3">
                <div className="">
                    <h1 className="flex items-center text-2xl font-bold">{user.displayName} <Checkmark verified={user.verified} /></h1>
                    <div className="text-muted-foreground">@{user.username}</div>
                </div>
                {user.bio && (
                    <>
                        <hr />
                        <div className="whitespace-pre-line overflow-hidden break-words">
                            {user.bio}
                        </div>
                    </>
                )}
                <div className="flex items-center text-muted-foreground"><CalendarDays size={16} className="mr-1"/>Joined {formatDate(user.createdAt, "MMMM yyyy")}</div>
                <div className="flex items-center gap-3">
                <span className="text-muted-foreground">
                    Posts:{" "}
                    <span className="text-primary font-semibold">
                        {formatNumber(user._count.Posts)}
                    </span>
                </span>
                    <FollowerCount userId={user.id} initialState={followerInfo} />
                </div>
            </div>
            {user.id === loggedInUserId ? (
                <Button>Edit Profile</Button>
            ) : (
                <FollowButton userId={user.id} initialState={followerInfo} />
            )}
        </div>
      </div>
    );
}