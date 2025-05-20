"use client";

import { useState, useEffect } from "react";
import { Loader2, ChevronDown } from "lucide-react";
import { PokemonCard } from "./pokemon-card";
import { Button } from "@/components/ui/button";
import { usePokemonList, usePokemonByType } from "@/lib/hooks";
import { useTypeFilterStore } from "@/lib/stores";
import { Pokemon } from "@/types";
import { formatName } from "@/lib/utils";

type PokemonGridProps = {
  initialPokemon?: Pokemon[];
}

export function PokemonGrid({ initialPokemon = [] }: PokemonGridProps) {
  const [offset, setOffset] = useState(initialPokemon.length || 0);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(initialPokemon);
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [typeOffset, setTypeOffset] = useState(0);
  const [typeFilteredList, setTypeFilteredList] = useState<Pokemon[]>([]);
  
  const limit = 10;
  const { data, isLoading, isFetching } = usePokemonList(limit, offset);
  
  const { selectedType } = useTypeFilterStore();
  const { 
    data: typeFilteredData, 
    isLoading: isTypeFilterLoading,
    isFetching: isTypeFilterFetching
  } = usePokemonByType(selectedType, limit, typeOffset);
  
  // Reset offsets when changing type filter
  useEffect(() => {
    if (selectedType) {
      setTypeOffset(0);
      setTypeFilteredList([]);
    } else {
      setOffset(initialPokemon.length || 0);
    }
  }, [selectedType, initialPokemon.length]);
  
  // Update typeFilteredList when new type data arrives
  useEffect(() => {
    if (typeFilteredData?.results && selectedType) {
      if (typeOffset === 0) {
        setTypeFilteredList(typeFilteredData.results);
      } else {
        setTypeFilteredList(prev => [...prev, ...typeFilteredData.results]);
      }
    }
  }, [typeFilteredData, selectedType, typeOffset]);
  
  const hasMore = selectedType 
    ? typeFilteredData?.hasMore 
    : data?.next !== null;
  
  const loading = isLoading || isFetching || isTypeFilterLoading || isTypeFilterFetching;
  
  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoadingAnimation(true);
    
    if (selectedType) {
      // Load more filtered Pokemon
      setTypeOffset(typeOffset + limit);
    } else {
      // Load more regular Pokemon
      setOffset(offset + limit);
      
      if (data?.results) {
        setTimeout(() => {
          setPokemonList([...pokemonList, ...data.results]);
          
          setTimeout(() => {
            setLoadingAnimation(false);
          }, 300);
        }, 800);
      }
    }
    
    // Add a small delay to show the animation
    setTimeout(() => {
      setLoadingAnimation(false);
    }, 1000);
  };

  // Determine which data to display - filtered or regular
  const displayedPokemon = selectedType 
    ? typeFilteredList 
    : (pokemonList.length > 0 ? pokemonList : (data?.results || []));

  // Calculate total count for display
  const totalCount = selectedType
    ? typeFilteredData?.count || 0
    : null;

  return (
    <div className="w-full">
      {isTypeFilterLoading && typeOffset === 0 ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-red-500" />
          <span className="ml-2 text-lg">Loading {selectedType} Pokémon...</span>
        </div>
      ) : displayedPokemon.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg mb-2">No Pokémon found!</p>
          <p className="text-gray-500">Try a different type filter or check back later.</p>
        </div>
      ) : (
        <>
          {selectedType && totalCount && (
            <div className="mb-4 text-center">
              <span className="text-sm font-medium text-gray-500">
                Found {totalCount} {selectedType}-type Pokémon • Showing {displayedPokemon.length} of {totalCount}
              </span>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedPokemon.map((poke, index) => (
              <div key={`${poke.name}-${index}`} className="animate-bounce-in" style={{ animationDelay: `${(index % 8) * 100}ms` }}>
                <PokemonCard name={poke.name} />
              </div>
            ))}
          </div>
        </>
      )}

      {hasMore && (
        <div className="flex justify-center mt-12 mb-8">
          <Button
            onClick={loadMore}
            disabled={loading}
            size="lg"
            className={`bg-red-500 hover:bg-red-600 gap-2 px-8 py-6 text-lg rounded-xl transition-all duration-300 ${loadingAnimation ? "animate-pulse" : ""}`}
          >
            {(loading || isTypeFilterFetching) ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Catching Pokémon...
              </>
            ) : (
              <>
                <ChevronDown className="h-5 w-5 animate-bounce" />
                Discover More {selectedType ? `${formatName(selectedType)} ` : ''}Pokémon
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
} 