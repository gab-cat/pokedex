"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { EvolutionChain } from "@/types";
import { cn } from "@/lib/utils";

type EvolutionTabProps = {
  evolutionChain: EvolutionChain[];
  currentPokemonName: string;
  primaryType?: string;
};

export function EvolutionTab({ evolutionChain, currentPokemonName, primaryType = "normal" }: EvolutionTabProps) {
  return (
    <Card className={cn(
      "border",
      `border-${primaryType === 'normal' ? 'gray-300' : `type-${primaryType}/50`}`
    )}>
      <CardContent className="p-4 py-0">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className={`h-5 w-5 text-type-${primaryType}`} />
          <h2 className={cn(
            "text-xl font-bold",
            primaryType === "normal" ? "gradient-text" : `text-type-${primaryType}`
          )}>Evolution Chain</h2>
        </div>

        {evolutionChain.length > 1 ? (
          <div className="flex flex-col space-y-4">
            {evolutionChain.map((evo, index) => {
              const formattedEvoName = evo.name.charAt(0).toUpperCase() + evo.name.slice(1);
              const isCurrentPokemon = currentPokemonName && evo.name === currentPokemonName;

              return (
                <div key={evo.name} className="relative">
                  {index > 0 && <div className={cn(
                    "absolute left-6 -top-4 h-4 w-0.5", 
                    `bg-type-${primaryType}/30`
                  )}></div>}
                  <div className={cn(
                    "flex items-center",
                    isCurrentPokemon ? `bg-type-${primaryType}/10 rounded-lg p-2` : ""
                  )}>
                    <div className="relative h-12 w-12 mr-4">
                      <div className={`absolute inset-0 rounded-full ${isCurrentPokemon ? `bg-type-${primaryType}/15` : 'bg-gray-100'}`}></div>
                      <Link href={`/pokemon/${evo.name}`}>
                        <div className="relative">
                          <Image
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.url.split("/")[6]}.png`}
                            alt={formattedEvoName}
                            width={48}
                            height={48}
                            className={`object-contain ${isCurrentPokemon ? "animate-bounce" : ""}`}
                            style={{
                              filter: isCurrentPokemon ? "none" : "grayscale(1)"
                            }}
                          />
                          {!isCurrentPokemon && (
                            <div className="absolute inset-0 bg-black opacity-30 rounded-full"></div>
                          )}
                        </div>
                      </Link>
                    </div>
                    <div className="flex-1">
                      <Link href={`/pokemon/${evo.name}`} className="hover:underline">
                        <span className={cn(
                          "font-medium", 
                          isCurrentPokemon ? `text-type-${primaryType}` : ""
                        )}>
                          {formattedEvoName}
                        </span>
                      </Link>
                      {evo.min_level && (
                        <p className="text-xs text-gray-500">Evolves at level {evo.min_level}</p>
                      )}
                      {evo.trigger && !evo.min_level && (
                        <p className="text-xs text-gray-500">
                          Evolves by {evo.trigger} {evo.item && `(${evo.item})`}
                        </p>
                      )}
                    </div>
                    {isCurrentPokemon && (
                      <div className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        `bg-type-${primaryType}/20 text-type-${primaryType}`
                      )}>Current</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600">This Pokémon does not evolve.</p>
        )}
      </CardContent>
    </Card>
  );
} 