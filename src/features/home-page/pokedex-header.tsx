import { Star } from "lucide-react";
import { SearchBar } from "@/features/home-page/search-bar";

export function PokedexHeader() {
  return (
    <div className="flex flex-col items-center mb-8 animate-fade-in animation-delay-900">
      <h2 className="text-3xl md:tracking-tight gradient-text md:text-6xl font-bold text-center mb-2 text-red-500 flex items-center gap-2">
        <Star className="h-6 w-6 text-yellow-500" />
        Pokédex
        <Star className="h-6 w-6 text-yellow-500" />
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mb-6">
        Click on any Pokémon to see detailed information about their types, abilities, and stats. Each Pokémon has
        unique characteristics waiting to be discovered!
      </p>
      <SearchBar />
    </div>
  );
} 