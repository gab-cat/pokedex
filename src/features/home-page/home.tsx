"use client";

import { useEffect } from "react";
import { HeroSection } from "./hero-section";
import { PokedexHeader } from "./pokedex-header";
import { TypeFilters } from "./type-filters";
import { PokemonGrid } from "@/features/card-view-list/pokemon-grid";
import { Pokemon } from "@/types/pokemon";
import { useTypeFilterStore } from "@/lib/stores";

type HomeProps = {
  initialPokemon?: Pokemon[];
  initialSelectedType?: string;
};

export function Home({ initialPokemon = [], initialSelectedType }: HomeProps) {
  const { toggleSelectedType } = useTypeFilterStore();
  
  // Set initial type filter from URL if provided
  useEffect(() => {
    if (initialSelectedType) {
      toggleSelectedType(initialSelectedType);
    }
  }, [initialSelectedType, toggleSelectedType]);
  
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-7xl min-h-screen">
        <HeroSection />
        <PokedexHeader />
        <TypeFilters />
        <PokemonGrid initialPokemon={initialPokemon} />
      </div>
    </main>
  );
} 