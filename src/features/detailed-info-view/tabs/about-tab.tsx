"use client";

import { Heart, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AboutTabProps = {
  pokemon: {
    description: string;
    habitat?: string;
    generation: string;
    growthRate: string;
    baseHappiness: number;
  };
  primaryType?: string;
};

export function AboutTab({ pokemon, primaryType = "normal" }: AboutTabProps) {
  return (
    <Card 
      style={{ animationDelay: '0.2s' }}
      className={cn(
        "border",
        `border-${primaryType === 'normal' ? 'gray-300' : `type-${primaryType}/50`}`
      )}
    >
      <CardContent className="p-4 py-0">
        <div className="flex items-center gap-2 mb-3">
          <Info className={`h-5 w-5 text-type-${primaryType}`} />
          <h2 className={cn(
            "text-xl font-bold",
            primaryType === "normal" ? "gradient-text" : `text-type-${primaryType}`
          )}>About</h2>
        </div>
        <p className="text-gray-700 mb-4">{pokemon.description}</p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-500">Habitat</p>
            <p className={cn(
              "font-medium capitalize",
              primaryType === "normal" ? "gradient-text" : `text-type-${primaryType}`
            )}>{pokemon.habitat || "Unknown"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Generation</p>
            <p className={cn(
              "font-medium capitalize",
              primaryType === "normal" ? "gradient-text" : `text-type-${primaryType}`
            )}>{pokemon.generation}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Growth Rate</p>
            <p className={cn(
              "font-medium capitalize",
              primaryType === "normal" ? "gradient-text" : `text-type-${primaryType}`
            )}>{pokemon.growthRate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Base Happiness</p>
            <div className="flex items-center gap-1">
              <Heart className={`h-4 w-4 text-type-${primaryType}`} />
              <span className={cn(
                "font-medium",
                primaryType === "normal" ? "gradient-text" : `text-type-${primaryType}`
              )}>{pokemon.baseHappiness}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 