import TrendsSidebar from "@/components/TrendsSidebar";
import Post from "@/components/posts/Post";
import PostEditor from "@/components/posts/editor/PostEditor";
import prisma from "@/lib/prisma";
import ForYouFeed from "./ForYouFeed";

export default function Home() {

  return (
    <main className="w-full min-w-0 flex gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <ForYouFeed /> 
      </div>
      <TrendsSidebar />
    </main>
  );
}
