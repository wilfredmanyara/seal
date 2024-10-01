import TrendsSidebar from "@/components/TrendsSidebar";
import { Metadata } from "next";
import SearchResults from "./SearchResults";

interface PageProps {
  searchParams: { q: string };
}

export function generateMetadata({ searchParams: { q } }: PageProps): Metadata {
  return {
    title: `Search results for "${q}`,
  };
}

export default function Page({ searchParams: { q } }: PageProps) {
  return (
    <main className="flex w-full min-w-0 gap-2">
      <div className="w-full min-w-0 space-y-2">
        <div className="-mb-3 -mt-5 rounded-2xl p-4">
          <h1 className="line-clamp-2 break-all text-center font-bold">
            &quot;{q}&quot;
          </h1>
          <hr />
        </div>
        <SearchResults query={q} />
      </div>
      <TrendsSidebar />
    </main>
  );
}
