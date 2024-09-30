import { validateRequest } from "@/auth";
import Checkmark from "@/components/Checkmark";
import FollowButton from "@/components/FollowButton";
import Linkify from "@/components/Linkify";
import UserAvatar from "@/components/UserAvatar";
import UserTooltip from "@/components/UserTooltip";
import Post from "@/components/posts/Post";
import prisma from "@/lib/prisma";
import { UserData, getPostDataInclude } from "@/lib/types";
import { CircleSpark } from "iconoir-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, cache } from "react";

interface PageProps {
  params: { postId: string };
}

const getPost = cache(async (postId: string, loggedInUserId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: getPostDataInclude(loggedInUserId),
  });

  if (!post) notFound();

  return post;
});

export async function generateMetadata({ params: { postId } }: PageProps) {
  const { user } = await validateRequest();

  if (!user) return {};

  const post = await getPost(postId, user.id);

  return {
    title: `${post.user.displayName}: ${post.content.slice(0, 50)}...`,
  };
}

export default async function Page({ params: { postId } }: PageProps) {
  const { user } = await validateRequest();

  if (!user) {
    return (
      <p className="text-destructive">
        You are not authorised to view this page.
      </p>
    );
  }

  const post = await getPost(postId, user.id);

  return (
    <main className="flex w-full min-w-0 gap-2">
      <div className="w-full min-w-0 space-y-2">
      <div className="rounded-2xl p-4 -mt-5 -mb-3">
        <h1 className="text-center text-2xl font-bold">Post</h1>
        <hr />
      </div>
        <Post post={post} />
      </div>
      <div className="sticky top-[5.25rem] hidden h-fit w-80 flex-none lg:block">
        <Suspense fallback={<CircleSpark className="mx-auto animate-spin" />}>
          <UserInfoSidebar user={post.user} />
        </Suspense>
      </div>
    </main>
  );
}

interface UserInfoSidebarProps {
  user: UserData;
}

async function UserInfoSidebar({ user }: UserInfoSidebarProps) {
  const { user: loggedInUser } = await validateRequest();
  if (!loggedInUser) return null;

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">About this User</div>
      <UserTooltip user={user}>
        <Link href={`/${user.username}`} className="flex items-center gap-3">
          <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
          <div>
            <p className="line-clamp-1 flex items-center break-all font-semibold hover:underline">
              {user.displayName}
              <Checkmark verified={user.verified} />
            </p>
            <p className="line-clamp-1 text-muted-foreground">
              @{user.username}
            </p>
          </div>
        </Link>
      </UserTooltip>
      <Linkify>
        <div className="line-clamp-1 whitespace-pre-line break-words text-muted-foreground">
          {user.bio}
        </div>
      </Linkify>
      {user.id !== loggedInUser.id && (
        <FollowButton
          userId={user.id}
          initialState={{
            followers: user._count.followers,
            isFollowedByUser: user.followers.some(
              ({ followerId }) => followerId === loggedInUser.id,
            ),
          }}
        />
      )}
    </div>
  );
}
