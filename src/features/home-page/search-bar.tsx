"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.toLowerCase().trim())}`);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`w-full max-w-md mb-8 transition-all duration-300 ${isFocused ? "scale-105" : ""}`}
    >
      <div className="flex w-full items-center space-x-2 relative">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search Pokémon by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="rounded-full pl-10 pr-10 py-6 border-2 border-red-200 focus:border-red-500 transition-all"
          />
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          type="submit"
          className="rounded-full bg-red-500 hover:bg-red-600 transition-all duration-300 hover:scale-105 py-6"
        >
          <Search className="h-4 w-4 mr-2" />
          <span>Search</span>
        </Button>
      </div>
    </form>
  );
} 