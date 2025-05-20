"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ArrowRight, ArrowLeft, Share2, Check, Heart } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useQueries } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PokemonDetails } from "@/types/pokemon";
import { useFavoritesStore } from "@/lib/stores";
import { useApiClient } from "@/lib/api";
import { cn } from "@/lib/utils";

type PokemonHeaderProps = {
  pokemonId: number;
  name?: string;
};

export function PokemonHeader({ pokemonId, name = "" }: PokemonHeaderProps) {
  const [isCopied, setIsCopied] = useState(false);
  const params = useParams();
  const pokemonName = (name || params.name as string);
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const apiClient = useApiClient();

  // Use useQueries to fetch both neighboring Pokemon in parallel
  const neighboringQueries = useQueries({
    queries: [
      {
        queryKey: ['neighboringPokemon', 'prev', pokemonId],
        queryFn: async () => {
          if (pokemonId <= 1) return null;
          return apiClient.get<PokemonDetails>(`/pokemon/${pokemonId - 1}`);
        },
        enabled: pokemonId > 1,
      },
      {
        queryKey: ['neighboringPokemon', 'next', pokemonId],
        queryFn: async () => {
          if (pokemonId >= 1302) return null;
          return apiClient.get<PokemonDetails>(`/pokemon/${pokemonId + 1}`);
        },
        enabled: pokemonId < 1302,
      }
    ]
  });

  // Extract queries for easier access
  const [prevPokemonQuery, nextPokemonQuery] = neighboringQueries;
  
  // Create objects to match original format
  const prevPokemon = prevPokemonQuery.data ? {
    name: prevPokemonQuery.data.name,
    url: `https://pokeapi.co/api/v2/pokemon/${pokemonId - 1}`
  } : null;
  
  const nextPokemon = nextPokemonQuery.data ? {
    name: nextPokemonQuery.data.name,
    url: `https://pokeapi.co/api/v2/pokemon/${pokemonId + 1}`
  } : null;

  const isPrevLoading = prevPokemonQuery.isLoading && pokemonId > 1;
  const isNextLoading = nextPokemonQuery.isLoading && pokemonId < 1302;

  const formatName = (pokemonName: string) => {
    return pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
  };

  const copyToClipboard = () => {
    const url = `${window.location.origin}/pokemon/${params.name}`;
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
    toast.success("Link copied to clipboard");
  };

  const toggleFavorite = () => {
    if (isFavorite(pokemonName)) {
      removeFavorite(pokemonName);
      toast.success(`${formatName(pokemonName)} removed from favorites`);
    } else {
      addFavorite(pokemonName);
      toast.success(`${formatName(pokemonName)} added to favorites`);
    }
  };

  return (
    <div className="mb-6 flex justify-between items-center">
      <div className="flex gap-2">
        <Link prefetch href="/">
          <Button 
            variant="outline" 
            className="gap-2 bg-gradient-to-r from-red-500/80 to-red-600/80 text-white border-0 hover:from-red-600/90 hover:to-red-700/90 hover:text-white transition-all shadow-md hover:shadow-lg">
            <ChevronLeft className="h-4 w-4" />
            Back to Pokédex
          </Button>
        </Link>
        
        <Button 
          variant="outline" 
          className="gap-2 bg-gradient-to-r from-red-500/80 to-red-600/80 text-white border-0 hover:from-red-600/90 hover:to-red-700/90 hover:text-white transition-all shadow-md hover:shadow-lg"
          onClick={copyToClipboard}
          title="Share Pokemon"
        >
          {isCopied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
          Share
        </Button>

        <Button 
          className={cn(
            "gap-2",
            isFavorite(pokemonName) ? "bg-white text-red-500 hover:bg-red-200 border" : "bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-600/90 hover:to-red-700/90"
          )}
          onClick={toggleFavorite}
          title={isFavorite(pokemonName) ? `Remove from favorites` : `Add to favorites`}
        >
          <Heart className="h-4 w-4" fill={isFavorite(pokemonName) ? "currentColor" : "none"} />
          {isFavorite(pokemonName) ? 'Unfavorite' : 'Favorite'}
        </Button>
      </div>

      <div className="flex gap-2">
        {isPrevLoading ? (
          <div className="min-w-[140px] h-10">
            <Skeleton className="h-10 w-full rounded-md bg-gray-300/20 animate-pulse" />
          </div>
        ) : prevPokemon && (
          <Link prefetch href={`/pokemon/${prevPokemon.name}`}>
            <Button 
              variant="default" 
              className="gap-2 animate-slideUp bg-gray-700/90 text-white border-0 hover:bg-gray-900/100 transition-all shadow-md hover:shadow-lg"
              title={`Previous: ${formatName(prevPokemon.name)}`}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous: {formatName(prevPokemon.name)}
            </Button>
          </Link>
        )}

        {isNextLoading ? (
          <div className="min-w-[140px] h-10">
            <Skeleton className="h-10 w-full rounded-md bg-gray-300/20 animate-pulse" />
          </div>
        ) : nextPokemon && (
          <Link prefetch href={`/pokemon/${nextPokemon.name}`}>
            <Button 
              variant="default" 
              className="gap-2 animate-slideUp bg-gray-700/90 text-white border-0 hover:bg-gray-900/100 transition-all shadow-md hover:shadow-lg"
              title={`Next: ${formatName(nextPokemon.name)}`}
            >
              Next: {formatName(nextPokemon.name)}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
} 