"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

export default function SearchField() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={handleSubmit} method="GET" action="/search">
      <div className="relative">
        <Input name="q" placeholder="Search" className="pe-10" />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 transform p-1 bg-transparent border-none cursor-pointer"
          aria-label="Search"
        >
          <SearchIcon className="size-5 text-muted-foreground" />
        </button>
      </div>
    </form>
  );
}
