"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dumbbell, Ruler, Heart } from "lucide-react";
import { getTypeIcon } from "../detailed-info-view/get-type-icon";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePokemonDetails } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/lib/stores";
import { showToast } from "@/lib/toast";

type PokemonCardProps = {
  name: string;
}

export function PokemonCard({ name }: PokemonCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const { data: pokemon, isLoading, error } = usePokemonDetails(name);
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  
  // Format the Pokemon name to be capitalized
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  
  if (error) {
    return (
      <Card className="overflow-hidden pokemon-card h-full p-4 border-2 border-red-400/40 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 flex items-center justify-center">
        <p>Error loading {formattedName}</p>
      </Card>
    );
  }

  // Get the primary type for card styling
  const primaryType = pokemon?.types[0]?.type.name || "normal";

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite(name)) {
      removeFavorite(name);
      showToast({ type: 'info', title: `${formattedName} removed from favorites`, description: 'You can view your favorites in the favorites page' });
    } else {
      addFavorite(name);
      showToast({ type: 'success', title: `${formattedName} added to favorites`, description: 'You can view your favorites in the favorites page' });
    }
  };

  return (
    <Link prefetch href={`/pokemon/${name}`}>
      <Card
        className={cn(
          "overflow-hidden pokemon-card h-full cursor-pointer relative backdrop-blur-sm border",
          `border-${primaryType === 'normal' ? 'gray-300' : `type-${primaryType}/50`}`,
          isHovered ? "z-10" : "z-0"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="card-shine rounded-lg"></div>
        {!isLoading && pokemon && (
          <div className="absolute top-0 right-0 p-2 flex items-center gap-2">
            <div className="text-xs font-mono bg-gray-900/60 text-gray-100 rounded-full px-2 py-0.5 shadow-sm backdrop-blur-sm">
              #{pokemon.id.toString().padStart(3, "0")}
            </div>
            <button 
              onClick={handleFavoriteClick}
              className={`p-1 rounded-full ${isFavorite(name) ? 'bg-red-500 text-white' : 'bg-gray-900/60 text-gray-100'} hover:scale-110 transition-all duration-200`}
            >
              <Heart className="h-4 w-4" fill={isFavorite(name) ? "white" : "none"} aria-label={isFavorite(name) ? "Remove from favorites" : "Add to favorites"} />
            </button>
          </div>
        )}
        <CardContent className="p-4 flex flex-col items-center">
          {isLoading || !pokemon ? (
            <>
              <Skeleton className="h-40 w-40 rounded-md mb-4" />
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-24 mb-2" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </>
          ) : (
            <>
              <div className="relative h-40 w-40 mb-4">
                {/* Circular glow effect */}
                <div 
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-type-${primaryType} blur-2xl opacity-20 animate-pulse z-0`}
                ></div>
                
                {/* Enhanced circular background with pulse */}
                <div className={`absolute inset-0 rounded-full bg-gradient-radial from-${primaryType === 'normal' ? 'gray-100' : `type-${primaryType}/5`} to-transparent animate-pulse opacity-50`}></div>
                
                {/* Animated blob effect on hover */}
                <div 
                  className={`absolute -inset-4 bg-gradient-to-br from-${primaryType === 'normal' ? 'gray-100' : `type-${primaryType}/10`} to-transparent rounded-full blur-xl opacity-50 ${isHovered ? 'animate-blob' : ''}`}
                ></div>
                
                <Image
                  src={
                    pokemon.sprites.other["official-artwork"].front_default || "/placeholder.svg?height=160&width=160"
                  }
                  alt={formattedName}
                  fill
                  className={`object-contain transition-all drop-shadow-lg duration-500 ${isHovered ? "scale-110 animate-float" : ""} z-10 relative`}
                />
              </div>
              
              <h3 className="text-lg font-bold mb-1 relative">
                {formattedName}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-type-${primaryType} transform scale-x-0 transition-transform duration-300 ${isHovered ? 'scale-x-100' : ''}`}></span>
              </h3>

              <div className="flex flex-wrap justify-center gap-1 mb-3 mt-2">
                {pokemon.types.map((typeInfo) => (
                  <div 
                    key={typeInfo.type.name} 
                    className={`type-badge flex flex-row w-max items-center gap-1 capitalize type-${typeInfo.type.name} ${isHovered ? 'animate-bounce-in' : ''}`}
                  >
                    {getTypeIcon(typeInfo.type.name)}
                    {typeInfo.type.name}
                  </div>
                ))}
              </div>

              <div className="w-full rounded-lg p-2 mt-1 backdrop-blur-sm">
                <div className="flex w-full justify-between text-xs text-gray-800">
                  <div className="flex items-center gap-1">
                    <Ruler className="h-3 w-3" />
                    <span>{(pokemon.height / 10).toFixed(1)}m</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Dumbbell className="h-3 w-3" />
                    <span>{(pokemon.weight / 10).toFixed(1)}kg</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </Link>
  );
} 