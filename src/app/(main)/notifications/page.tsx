import { Metadata } from "next";
import TrendsSidebar from "@/components/TrendsSidebar";
import Notifications from "./Notifications";

export const metadata: Metadata = {
    title: "Notifications"
}

export default function Page() {
    return (
      <main className="flex w-full min-w-0 gap-2">
        <div className="w-full min-w-0 space-y-2">
          <Notifications />
        </div>
        <TrendsSidebar />
      </main>
    );
}