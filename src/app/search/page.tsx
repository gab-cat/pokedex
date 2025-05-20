import { Metadata } from "next";
import { SearchResults } from "@/features/search-page/search-results";

export const metadata: Metadata = {
  title: "Search Pokémon | Pokédex",
  description: "Search for your favorite Pokémon by name, type, or ability in our comprehensive Pokédex database.",
  openGraph: {
    title: "Search Pokémon | Pokédex",
    description: "Search for your favorite Pokémon by name, type, or ability in our comprehensive Pokédex database.",
    type: "website",
    images: [
      {
        url: "/hero.avif",
        width: 1200,
        height: 630,
        alt: "Pokédex Search"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Search Pokémon | Pokédex",
    description: "Search for your favorite Pokémon by name, type, or ability in our comprehensive Pokédex database.",
    images: [
      {
        url: "/hero.avif",
      },
    ],
  }
};

export default function SearchPage() {
  return <SearchResults />;
} 