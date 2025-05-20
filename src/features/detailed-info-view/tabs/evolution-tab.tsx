"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { EvolutionChain } from "@/types";

type EvolutionTabProps = {
  evolutionChain: EvolutionChain[];
  currentPokemonName: string;
};

export function EvolutionTab({ evolutionChain, currentPokemonName }: EvolutionTabProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-red-500" />
          <h2 className="text-xl font-bold">Evolution Chain</h2>
        </div>

        {evolutionChain.length > 1 ? (
          <div className="flex flex-col space-y-4">
            {evolutionChain.map((evo, index) => {
              const formattedEvoName = evo.name.charAt(0).toUpperCase() + evo.name.slice(1);
              const isCurrentPokemon = currentPokemonName && evo.name === currentPokemonName;

              return (
                <div key={evo.name} className="relative">
                  {index > 0 && <div className="absolute left-6 -top-4 h-4 w-0.5 bg-gray-300"></div>}
                  <div className={`flex items-center ${isCurrentPokemon ? "bg-red-50 rounded-lg p-2" : ""}`}>
                    <div className="relative h-12 w-12 mr-4">
                      <div className="absolute inset-0 bg-gray-100 rounded-full"></div>
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
                        <span className={`font-medium ${isCurrentPokemon ? "text-red-500" : ""}`}>
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
                      <div className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Current</div>
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