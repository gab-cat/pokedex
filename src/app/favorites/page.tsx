import { Metadata } from "next";
import { FavoritesView } from "@/features/favorites-page/favorites-view";

export const metadata: Metadata = {
  title: "Favorite Pokémon | Pokédex",
  description: "View and manage your collection of favorite Pokémon in your personal Pokédex.",
  openGraph: {
    title: "Favorite Pokémon | Pokédex",
    description: "View and manage your collection of favorite Pokémon in your personal Pokédex.",
    type: "website",
    images: [
      {
        url: "/hero.avif",
        width: 1200,
        height: 630,
        alt: "Favorite Pokémon Collection"
      }
    ]
  },
  twitter: {
    images: [
      {
        url: "/hero.avif",
      },
    ],
    card: "summary_large_image",
    title: "Favorite Pokémon | Pokédex",
    description: "View and manage your collection of favorite Pokémon in your personal Pokédex."
  }
};

export default function FavoritesPage() {
  return <FavoritesView />;
} 