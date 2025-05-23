"use client";

import Image from "next/image";
import { Ruler, Scale, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { getTypeWeaknesses } from "./utils";
import { getTypeIcon } from "./get-type-icon";
import { Card, CardContent } from "@/components/ui/card";
import { PokemonDetails } from "@/types/pokemon";
import { cn } from "@/lib/utils";

type PokemonShowcaseProps = {
  pokemon: Pick<PokemonDetails, 'id' | 'sprites' | 'types' | 'height' | 'weight'> & {
    genus?: string;
  };
  name: string;
};

export function PokemonShowcase({ pokemon, name }: PokemonShowcaseProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  // Format the Pokemon name to be capitalized
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  
  // Get the Pokemon's type names
  const typeNames = pokemon.types.map(typeInfo => typeInfo.type.name);
  
  // Get the primary type for styling
  const primaryType = pokemon.types[0]?.type.name || "normal";
  
  // Get weaknesses based on the Pokemon's types
  const weaknesses = getTypeWeaknesses(typeNames);

  return (
    <Card className={cn(
      "w-full overflow-hidden border",
      `border-${primaryType === 'normal' ? 'gray-300' : `type-${primaryType}/50`}`,
      `bg-gradient-to-b from-${primaryType === 'normal' ? 'gray-50' : `type-${primaryType}/5`} to-transparent`
    )}>
      <CardContent className="p-4 py-0 flex flex-col items-center">
        <div className="relative h-64 w-64 mb-4">
          {/* Primary type color glow effect */}
          <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-type-${primaryType} blur-2xl opacity-5 animate-pulse z-0`}
          ></div>
          
          {/* Gradient circle background */}
          <div className={`absolute inset-0 bg-gradient-radial from-${primaryType === 'normal' ? 'white/10' : `type-${primaryType}/15`} to-transparent rounded-full animate-pulse`}></div>
          
          {/* Outer glow */}
          <div className={`absolute -inset-4 bg-gradient-to-br from-${primaryType === 'normal' ? 'gray-100/30' : `type-${primaryType}/10`} to-transparent rounded-full blur-xl`}></div>
          
          <Image
            src={
              pokemon.sprites.other["official-artwork"].front_default || "/placeholder.svg?height=256&width=256"
            }
            alt={formattedName}
            fill
            className={cn(
              "object-contain z-10 relative",
              isImageLoaded ? "animate-fadeIn" : "opacity-0"
            )}
            onLoad={() => {
              setIsImageLoaded(true);
            }}
            priority
          />
        </div>

        <h1 className={cn(
          "text-3xl font-bold mb-2",
          primaryType === "normal" ? "gradient-text" : `text-type-${primaryType}`
        )}>{formattedName}</h1>
        <p className="text-lg text-gray-500 mb-2">#{pokemon.id.toString().padStart(3, "0")}</p>
        {pokemon.genus && <p className="text-sm text-gray-600 italic mb-4">{pokemon.genus}</p>}

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {pokemon.types.map((typeInfo) => {
            const typeName = typeInfo.type.name;
            return (
              <div
                key={typeName}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-white font-medium text-sm type-${typeName}`}
                style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}
              >
                {getTypeIcon(typeName)}
                {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
              </div>
            );
          })}
        </div>

        {/* Weaknesses Section */}
        <div className="w-full mb-4">
          <div className="flex items-center gap-1 text-gray-600 mb-2 justify-center">
            <ShieldAlert className="h-4 w-4 text-red-500" />
            <p className="text-sm font-medium">Weak Against</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {weaknesses.map((weakness) => (
              <div
                key={weakness}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-white font-medium text-xs type-${weakness}`}
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
              >
                {getTypeIcon(weakness)}
                {weakness.charAt(0).toUpperCase() + weakness.slice(1)}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className={`text-center flex flex-col items-center rounded-lg p-2 bg-gradient-to-br from-${primaryType === 'normal' ? 'gray-50' : `type-${primaryType}/10`} to-${primaryType === 'normal' ? 'gray-100' : `type-${primaryType}/5`}`}>
            <div className="flex items-center gap-1 text-gray-600">
              <Ruler className={`h-3 w-3 text-type-${primaryType}`} />
              <p className="text-xs">Height</p>
            </div>
            <p className="font-semibold text-gray-800 text-sm">{pokemon.height / 10} m</p>
          </div>
          <div className={`text-center flex flex-col items-center rounded-lg p-2 bg-gradient-to-br from-${primaryType === 'normal' ? 'gray-50' : `type-${primaryType}/10`} to-${primaryType === 'normal' ? 'gray-100' : `type-${primaryType}/5`}`}>
            <div className="flex items-center gap-1 text-gray-600">
              <Scale className={`h-3 w-3 text-type-${primaryType}`} />
              <p className="text-xs">Weight</p>
            </div>
            <p className="font-semibold text-gray-800 text-sm">{pokemon.weight / 10} kg</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 