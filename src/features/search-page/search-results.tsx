"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useSearchPokemon } from "@/lib/hooks";
import { PokemonCard } from "@/features/card-view-list/pokemon-card";
import { SearchBar } from "@/features/home-page/search-bar";
import { Button } from "@/components/ui/button";

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const { data, isLoading } = useSearchPokemon(query);
  
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-7xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="gap-2 bg-gray-900/5 hover:bg-gray-900/10 mb-6">
              <ChevronLeft className="h-4 w-4" />
              Back to Pokédex
            </Button>
          </Link>
          
          <h1 className="text-3xl font-bold mb-4">Search Results for &quot;{query}&quot;</h1>
          <SearchBar />
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Searching for Pokémon...</p>
          </div>
        ) : data?.results.length === 0 ? (
          <div className="text-center py-12 bg-gray-900/5 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">No Pokémon Found</h2>
            <p className="text-gray-600">Try searching for a different name or check your spelling.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.results.map((pokemon) => (
              <div key={pokemon.name} className="animate-bounce-in">
                <PokemonCard name={pokemon.name} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 