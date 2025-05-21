"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Search, Loader2, AlertCircle, ArrowDown, ArrowUp, SlidersHorizontal } from "lucide-react";
import { useSearchPokemon } from "@/lib/hooks";
import { PokemonCard } from "@/features/card-view-list/pokemon-card";
import { SearchBar } from "@/features/home-page/search-bar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu";

type SortOption = { field: 'name' | 'id', order: 'asc' | 'desc' };
type FilterOption = { type: 'name' | 'id' | null };

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [sort, setSort] = useState<SortOption>({ field: 'id', order: 'asc' });
  const [filter, setFilter] = useState<FilterOption>({ type: null });
  
  const { data, isLoading } = useSearchPokemon(
    query, 
    filter.type ? { type: filter.type } : undefined, 
    sort
  );
  
  const getSortLabel = () => {
    return `${sort.field === 'name' ? 'Name' : 'ID'} ${sort.order === 'asc' ? '↑' : '↓'}`;
  };

  const getFilterLabel = () => {
    if (!filter.type) return "All";
    return filter.type === 'name' ? 'Name' : 'ID';
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-7xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="gap-2 bg-white hover:bg-gray-50 mb-6 shadow-sm group transition-all">
              <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Pokédex
            </Button>
          </Link>
          
          <h1 className="text-3xl font-bold mb-4 text-gray-800 flex items-center gap-3">
            <Search className="h-7 w-7 text-red-500" />
            Search Results: <span className="text-red-500">&quot;{query}&quot;</span>
          </h1>
          <div className="bg-white p-3">
            <SearchBar />
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-10 flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 text-red-500 animate-spin mb-4" />
            <div>
              <p className="text-xl font-medium text-gray-800 mb-1">Searching for Pokémon...</p>
              <p className="text-gray-500">Traversing tall grass and caves for &quot;{query}&quot;</p>
            </div>
          </div>
        ) : data?.results.length === 0 ? (
          <div className="text-center p-12 pt-5 bg-white rounded-lg">
            <div className="bg-red-50 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center">
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">No Pokémon Found</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              We couldn&apos;t find any Pokémon matching &quot;{query}&quot;. Try checking your spelling or searching for a different name.
            </p>
            
            <div className="flex justify-center">
              <Link href="/">
                <Button className="bg-red-500 hover:bg-red-600 text-white">
                  Browse All Pokémon
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white p-4 rounded-lg mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <p className="text-gray-700">
                  <strong className="text-red-500">{data?.results.length}</strong> Pokémon found matching your search
                </p>

                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <SlidersHorizontal className="h-4 w-4" />
                        Filter: {getFilterLabel()}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup 
                        value={filter.type || "all"} 
                        onValueChange={(value) => setFilter({ type: value === "all" ? null : value as 'name' | 'id' })}
                      >
                        <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="id">ID No.</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

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
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data?.results.map((pokemon, index) => (
                <div key={pokemon.name} className="animate-bounceIn" 
                  style={{ animationDelay: `${index * 0.05}s` }}>
                  <PokemonCard name={pokemon.name} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
} 