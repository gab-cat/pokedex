"use client";

import { useState, useEffect } from "react";
import { Loader2, ChevronDown, ArrowUp, ArrowDown } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { PokemonCard } from "./pokemon-card";
import { Button } from "@/components/ui/button";
import { usePokemonList, usePokemonByType, getPokemonIdFromUrl } from "@/lib/hooks";
import { useTypeFilterStore } from "@/lib/stores";
import { Pokemon } from "@/types";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

type SortOption = { field: 'name' | 'id', order: 'asc' | 'desc' };

type PokemonGridProps = {
  initialPokemon?: Pokemon[];
}

export function PokemonGrid({ initialPokemon = [] }: PokemonGridProps) {
  const [offset, setOffset] = useState(initialPokemon.length || 0);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(initialPokemon);
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [typeOffset, setTypeOffset] = useState(0);
  const [typeFilteredList, setTypeFilteredList] = useState<Pokemon[]>([]);
  const [sort, setSort] = useState<SortOption>({ field: 'id', order: 'asc' });
  
  const limit = 10;
  const { data, isLoading, isFetching } = usePokemonList(limit, offset);
  
  const { selectedTypes } = useTypeFilterStore();
  const { 
    data: typeFilteredData, 
    isLoading: isTypeFilterLoading,
    isFetching: isTypeFilterFetching
  } = usePokemonByType(selectedTypes, limit, typeOffset, sort);

  const [parent] = useAutoAnimate();
  
  // Reset offsets when changing type filter
  useEffect(() => {
    if (selectedTypes.length > 0) {
      setTypeOffset(0);
      setTypeFilteredList([]);
    } else {
      setOffset(initialPokemon.length || 0);
    }
  }, [selectedTypes, initialPokemon.length]);
  
  // Update typeFilteredList when new type data arrives
  useEffect(() => {
    if (typeFilteredData?.results && selectedTypes.length > 0) {
      if (typeOffset === 0) {
        setTypeFilteredList(typeFilteredData.results);
      } else {
        setTypeFilteredList(prev => [...prev, ...typeFilteredData.results]);
      }
    }
  }, [typeFilteredData, selectedTypes, typeOffset]);

  // Apply sort to main pokemon list
  useEffect(() => {
    if (data?.results && selectedTypes.length === 0) {
      // Create a copy of the current data to sort instead of using pokemonList
      const currentPokemon = [...data.results];
      const sortedResults = currentPokemon.sort((a, b) => {
        if (sort.field === 'name') {
          return sort.order === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else {
          const idA = getPokemonIdFromUrl(a.url);
          const idB = getPokemonIdFromUrl(b.url);
          return sort.order === 'asc' ? idA - idB : idB - idA;
        }
      });
      
      setPokemonList(sortedResults);
    }
  }, [sort, data?.results, selectedTypes]); // Remove pokemonList from dependencies
  
  const hasMore = selectedTypes.length > 0
    ? typeFilteredData?.hasMore 
    : data?.next !== null;
  
  const loading = isLoading || isFetching || isTypeFilterLoading || isTypeFilterFetching;
  
  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoadingAnimation(true);
    
    if (selectedTypes.length > 0) {
      // Load more filtered Pokemon
      setTypeOffset(typeOffset + limit);
    } else {
      // Load more regular Pokemon
      setOffset(offset + limit);
      
      if (data?.results) {
        setTimeout(() => {
          // Apply sorting to new pokemon without creating dependency on pokemonList
          const newPokemon = [...data.results];
          
          // Sort the new pokemon according to the current sort settings
          const sortedNewPokemon = newPokemon.sort((a, b) => {
            if (sort.field === 'name') {
              return sort.order === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
            } else {
              const idA = getPokemonIdFromUrl(a.url);
              const idB = getPokemonIdFromUrl(b.url);
              return sort.order === 'asc' ? idA - idB : idB - idA;
            }
          });
          
          // Append the sorted new pokemon to the existing list
          setPokemonList(currentList => [...currentList, ...sortedNewPokemon]);
          
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
  const displayedPokemon = selectedTypes.length > 0 
    ? typeFilteredList 
    : (pokemonList.length > 0 ? pokemonList : (data?.results || []));

  // Calculate total count for display
  const totalCount = selectedTypes.length > 0
    ? typeFilteredData?.count || 0
    : null;

  const getSortLabel = () => {
    return `${sort.field === 'name' ? 'Name' : 'ID'} ${sort.order === 'asc' ? '↑' : '↓'}`;
  };

  return (
    <div className="w-full">
      {/* Sorting options */}
      <div className="mb-6 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              {sort.order === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              Sort: {getSortLabel()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSort({ field: 'name', order: 'asc' })} className={sort.field === 'name' && sort.order === 'asc' ? 'bg-accent' : ''}>
              <ArrowUp className="h-4 w-4 mr-2" /> Name (A-Z)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSort({ field: 'name', order: 'desc' })} className={sort.field === 'name' && sort.order === 'desc' ? 'bg-accent' : ''}>
              <ArrowDown className="h-4 w-4 mr-2" /> Name (Z-A)
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSort({ field: 'id', order: 'asc' })} className={sort.field === 'id' && sort.order === 'asc' ? 'bg-accent' : ''}>
              <ArrowUp className="h-4 w-4 mr-2" /> ID (Low-High)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSort({ field: 'id', order: 'desc' })} className={sort.field === 'id' && sort.order === 'desc' ? 'bg-accent' : ''}>
              <ArrowDown className="h-4 w-4 mr-2" /> ID (High-Low)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isTypeFilterLoading && typeOffset === 0 ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-red-500" />
          <span className="ml-2 text-lg">Loading Pokémon...</span>
        </div>
      ) : displayedPokemon.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg mb-2">No Pokémon found!</p>
          <p className="text-gray-500">Try a different type filter or check back later.</p>
        </div>
      ) : (
        <>
          {selectedTypes.length > 0 && totalCount && (
            <div className="mb-4 text-center">
              <span className="text-sm font-medium text-gray-500">
                Found {totalCount} Pokémon with selected types • Showing {displayedPokemon.length} of {totalCount}
              </span>
            </div>
          )}
          
          <div ref={parent} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
                Discover More Pokémon
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
} 