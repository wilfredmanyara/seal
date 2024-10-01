import { Metadata } from "next";
import Bookmarks from "./Bookmarks";
import TrendsSidebar from "@/components/TrendsSidebar";

export const metadata: Metadata = {
    title: "Bookmarks"
}

export default function Page() {
    return (
      <main className="flex w-full min-w-0 gap-2">
        <div className="w-full min-w-0 space-y-2">
          <Bookmarks />
        </div>
        <TrendsSidebar />
      </main>
    );
}