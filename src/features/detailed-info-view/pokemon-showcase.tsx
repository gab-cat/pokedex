"use client";

import Image from "next/image";
import { Ruler, Scale, ShieldAlert } from "lucide-react";
import { getTypeWeaknesses } from "./utils";
import { getTypeIcon } from "./get-type-icon";
import { Card, CardContent } from "@/components/ui/card";
import { PokemonDetails } from "@/types/pokemon";

type PokemonShowcaseProps = {
  pokemon: Pick<PokemonDetails, 'id' | 'sprites' | 'types' | 'height' | 'weight'> & {
    genus?: string;
  };
  name: string;
};

export function PokemonShowcase({ pokemon, name }: PokemonShowcaseProps) {
  // Format the Pokemon name to be capitalized
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  
  // Get the Pokemon's type names
  const typeNames = pokemon.types.map(typeInfo => typeInfo.type.name);
  
  // Get weaknesses based on the Pokemon's types
  const weaknesses = getTypeWeaknesses(typeNames);

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-4 py-0 flex flex-col items-center">
        <div className="relative h-64 w-64 mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/5 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 bg-gray-900/5 rounded-full blur-xl"></div>
          <Image
            src={
              pokemon.sprites.other["official-artwork"].front_default || "/placeholder.svg?height=256&width=256"
            }
            alt={formattedName}
            fill
            className="object-contain animate-float"
            priority
          />
        </div>

        <h1 className="text-3xl gradient-text font-bold mb-2">{formattedName}</h1>
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
          <div className="text-center flex flex-col items-center rounded-lg p-2 bg-gradient-to-br from-red-50 to-red-100">
            <div className="flex items-center gap-1 text-gray-600">
              <Ruler className="h-3 w-3 text-red-500" />
              <p className="text-xs">Height</p>
            </div>
            <p className="font-semibold text-gray-800 text-sm">{pokemon.height / 10} m</p>
          </div>
          <div className="text-center flex flex-col items-center rounded-lg p-2 bg-gradient-to-br from-red-50 to-red-100">
            <div className="flex items-center gap-1 text-gray-600">
              <Scale className="h-3 w-3 text-red-500" />
              <p className="text-xs">Weight</p>
            </div>
            <p className="font-semibold text-gray-800 text-sm">{pokemon.weight / 10} kg</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 