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
    <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-center sm:justify-start">
        <Link prefetch href="/">
          <Button 
            variant="outline" 
            size="sm"
            className="gap-1 transition-all border text-xs sm:text-sm sm:gap-2">
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Back to Pokédex</span>
            <span className="xs:hidden">Back</span>
          </Button>
        </Link>
        
        <Button 
          variant="outline"
          size="sm" 
          className="gap-1 sm:gap-2 bg-gradient-to-r from-blue-500/80 to-blue-600/80 text-white border-0 hover:from-blue-600/90 hover:to-blue-700/90 hover:text-white transition-all shadow-md hover:shadow-lg text-xs sm:text-sm"
          onClick={copyToClipboard}
          title="Share Pokemon"
        >
          {isCopied ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />}
          Share
        </Button>

        <Button
          size="sm" 
          className={cn(
            "gap-1 sm:gap-2 text-xs sm:text-sm",
            isFavorite(pokemonName) ? "bg-white text-red-500 hover:bg-red-200 border" : "bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-600/90 hover:to-red-700/90"
          )}
          onClick={toggleFavorite}
          title={isFavorite(pokemonName) ? `Remove from favorites` : `Add to favorites`}
        >
          <Heart className="h-3 w-3 sm:h-4 sm:w-4" fill={isFavorite(pokemonName) ? "currentColor" : "none"} />
          {isFavorite(pokemonName) ? 'Unfavorite' : 'Favorite'}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center sm:justify-end w-full sm:w-auto">
        {isPrevLoading ? (
          <div className="h-8 sm:h-10 w-[100px] sm:w-[140px]">
            <Skeleton className="h-full w-full rounded-md bg-gray-300/20 animate-pulse" />
          </div>
        ) : prevPokemon && (
          <Link prefetch href={`/pokemon/${prevPokemon.name}`}>
            <Button 
              variant="default"
              size="sm" 
              className="gap-1 sm:gap-2 animate-slideUp bg-gray-700/90 text-white border-0 hover:bg-gray-900/100 transition-all shadow-md hover:shadow-lg text-xs sm:text-sm"
              title={`Previous: ${formatName(prevPokemon.name)}`}
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              {/* display pokemon id and name with id setfill to 3 0 if less than 1000*/}
              <span className="hidden xs:inline">Previous:</span> #{(pokemonId - 1).toString().padStart(3, '0')} - {formatName(prevPokemon.name).substring(0, 12)}{prevPokemon.name.length > 12 ? "..." : ""}
            </Button>
          </Link>
        )}

        {isNextLoading ? (
          <div className="h-8 sm:h-10 w-[100px] sm:w-[140px]">
            <Skeleton className="h-full w-full rounded-md bg-gray-300/20 animate-pulse" />
          </div>
        ) : nextPokemon && (
          <Link prefetch href={`/pokemon/${nextPokemon.name}`}>
            <Button 
              variant="default"
              size="sm" 
              className="gap-1 sm:gap-2 animate-slideUp bg-gray-700/90 text-white border-0 hover:bg-gray-900/100 transition-all shadow-md hover:shadow-lg text-xs sm:text-sm"
              title={`Next: ${formatName(nextPokemon.name)}`}
            >
              <span className="hidden xs:inline">Next:</span> #{(pokemonId + 1).toString().padStart(3, '0')} - {formatName(nextPokemon.name).substring(0, 12)}{nextPokemon.name.length > 12 ? "..." : ""}
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
} 