"use client";

import { Zap, Sparkles } from "lucide-react";
import { PokemonDetails } from "../../../types/pokemon";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AbilitiesTabProps = {
  abilities: PokemonDetails["abilities"];
  pokemon: PokemonDetails;
  primaryType?: string;
};

export function AbilitiesTab({ abilities, pokemon, primaryType = "normal" }: AbilitiesTabProps) {
  const formattedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const getDefaultDescription = (name: string, isHidden: boolean) => {
    if (isHidden) {
      return `${name} is a hidden ability that requires special conditions to obtain.`;
    }
    return `${name} is a standard ability for ${formattedName}.`;
  };

  return (
    <Card className={cn(
      "border",
      `border-${primaryType === 'normal' ? 'gray-300' : `type-${primaryType}/50`}`
    )}>
      <CardContent className="p-4 py-0">
        <div className="flex items-center gap-2 mb-4">
          <Zap className={`h-5 w-5 text-type-${primaryType}`} />
          <h2 className={cn(
            "text-xl font-bold",
            primaryType === "normal" ? "gradient-text" : `text-type-${primaryType}`
          )}>Abilities</h2>
        </div>
        <ul className="space-y-4">
          {abilities.map((ability, index) => {
            const abilityName = ability.ability.name.replace("-", " ");
            const formattedAbilityName = abilityName
              .split(" ")
              .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            // @ts-expect-error - description is not always available
            const description = ability.description || getDefaultDescription(formattedAbilityName, ability.is_hidden);

            return (
              <li
                key={ability.ability.name}
                className="flex items-start opacity-0 animate-slide-up bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className={`mt-1 mr-3 p-1.5 rounded-full ${ability.is_hidden ? "bg-purple-100" : "bg-blue-100"}`}
                >
                  {ability.is_hidden ? (
                    <Sparkles className="h-5 w-5 text-purple-500" />
                  ) : (
                    <Zap className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="font-semibold text-gray-800">{formattedAbilityName}</span>
                    {ability.is_hidden && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
} 