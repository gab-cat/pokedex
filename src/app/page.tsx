import { Metadata } from "next";
import { Home } from "@/features/home-page/home";
import { useApiClient } from "@/lib/api";
import { PokemonListResponse } from "@/types";

export const metadata: Metadata = {
  title: "Pokédex | Your Ultimate Pokémon Encyclopedia",
  description: "A comprehensive Pokédex web application to explore and learn about different Pokémon species, their abilities, types, and stats.",
  keywords: ['Pokémon', 'Pokédex', 'Pokemon database', 'Pokemon types', 'Pokemon stats', 'Pokemon encyclopedia'],
  openGraph: {
    title: "Pokédex | Your Ultimate Pokémon Encyclopedia",
    description: "Explore the world of Pokémon with our comprehensive Pokédex. Search, filter, and discover details about your favorite Pokémon.",
    type: "website",
    url: "https://pokedex.gab-cat.me",
    images: [
      {
        url: "/hero.avif",
        width: 1200,
        height: 630,
        alt: "Pokédex - Your Ultimate Pokémon Encyclopedia"
      }
    ],
    siteName: "Pokédex"
  },
  twitter: {
    card: "summary_large_image",
    title: "Pokédex | Your Ultimate Pokémon Encyclopedia",
    description: "Explore the world of Pokémon with our comprehensive Pokédex. Search, filter, and discover details about your favorite Pokémon.",
    images: ["/hero.avif"]
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "https://pokedex.gab-cat.me"
  }
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const revalidate = 300;
export const dynamic = 'force-static';

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  // Get type from search params if it exists
  const typeParam = params.type;
  const selectedType = typeof typeParam === 'string' ? typeParam : undefined;
  

  // use the api.ts useApiClient to fetch the initial list of Pokemon
  const api = useApiClient();
  const data = await api.get<PokemonListResponse>("/pokemon?limit=10&offset=0");

  return <Home initialPokemon={data.results} initialSelectedType={selectedType} />;
}
