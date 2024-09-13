import { PostData } from "@/lib/types";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import { formatRelativeDate } from "@/lib/utils";
import Checkmark from "../Checkmark";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  return (
    <article className="space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <Link href={`/users/${post.user.username}`}>
          <UserAvatar avatarUrl={post.user.avatarUrl} />
        </Link>
        <div className="">
        <div className="flex items-center">
            <Link
            href={`/users/${post.user.username}`}
            className="block hover:text-gray-500 font-bold">
                {post.user.displayName}
            </Link>
            <Checkmark verified={post.user.verified} />
            </div>
            <Link 
            href={`/posts/${post.id}`}
            className="block text-sm text-muted-foreground hover:underline">
                {formatRelativeDate(post.createdAt)}
            </Link>
        </div>
      </div>
      <div className="whitespace-pre-line break-words">
        {post.content}
      </div>
    </article>
  );
}
