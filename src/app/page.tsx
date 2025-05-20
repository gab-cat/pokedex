import { Metadata } from "next";
import { Home } from "@/features/home-page/home";
import { useApiClient } from "@/lib/api";
import { PokemonListResponse } from "@/types";

export const metadata: Metadata = {
  title: "Pokédex",
  description: "A comprehensive Pokédex web application to explore and learn about different Pokémon species, their abilities, types, and stats.",
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const revalidate = 300;

export default async function HomePage({ searchParams }: Props) {
  // Get type from search params if it exists
  const typeParam = searchParams.type;
  const selectedType = typeof typeParam === 'string' ? typeParam : undefined;
  

  // use the api.ts useApiClient to fetch the initial list of Pokemon
  const api = useApiClient();
  const data = await api.get<PokemonListResponse>("/pokemon?limit=10&offset=0");

  return <Home initialPokemon={data.results} initialSelectedType={selectedType} />;
}
