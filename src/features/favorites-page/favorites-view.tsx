"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, ChevronLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavoritesStore } from "@/lib/stores";
import { PokemonCard } from "@/features/card-view-list/pokemon-card";
import { Pokemon } from "@/types";

export function FavoritesView() {
  const { favorites } = useFavoritesStore();
  const [isLoading, setIsLoading] = useState(true);
  const [favoritePokemons, setFavoritePokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    // This needs to be client-side because we're using localStorage through Zustand
    const fetchFavorites = async () => {
      setIsLoading(true);
      
      if (favorites.length === 0) {
        setFavoritePokemons([]);
        setIsLoading(false);
        return;
      }
      
      // Convert favorites names to Pokemon objects for the grid
      const pokemonList = favorites.map(name => ({
        name,
        url: `https://pokeapi.co/api/v2/pokemon/${name}`
      }));
      
      setFavoritePokemons(pokemonList);
      setIsLoading(false);
    };
    
    fetchFavorites();
  }, [favorites]);
  
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <Link href="/">
              <Button 
                variant="outline" 
                className="mb-4 md:mb-0 gap-2 bg-gradient-to-r from-red-500/80 to-red-600/80 text-white border-0 hover:from-red-600/90 hover:to-red-700/90 hover:text-white transition-all shadow-md hover:shadow-lg"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Pokédex
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center">
            <Heart className="h-6 w-6 mr-2 text-red-500" fill="currentColor" />
            <h1 className="text-3xl font-bold">Your Favorite Pokémon</h1>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-red-500" />
            <span className="ml-2 text-lg">Loading your favorites...</span>
          </div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart className="h-16 w-16 mb-4 text-gray-300" />
            <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
            <p className="text-gray-500 mb-6">You haven&apos;t added any Pokémon to your favorites</p>
            <Link href="/">
              <Button className="bg-red-500 hover:bg-red-600">
                Explore Pokémon
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoritePokemons.map((poke, index) => (
              <div key={poke.name} className="animate-bounce-in" style={{ animationDelay: `${(index % 8) * 100}ms` }}>
                <PokemonCard name={poke.name} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 