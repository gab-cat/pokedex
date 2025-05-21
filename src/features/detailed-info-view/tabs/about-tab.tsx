"use client";

import { Heart, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type AboutTabProps = {
  pokemon: {
    description: string;
    habitat?: string;
    generation: string;
    growthRate: string;
    baseHappiness: number;
  };
};

export function AboutTab({ pokemon }: AboutTabProps) {
  return (
    <Card style={{ animationDelay: '0.2s' }}>
      <CardContent className="p-4 py-0">
        <div className="flex items-center gap-2 mb-3">
          <Info className="h-5 w-5 text-red-500" />
          <h2 className="text-xl gradient-text font-bold">About</h2>
        </div>
        <p className="text-gray-700 mb-4">{pokemon.description}</p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-500">Habitat</p>
            <p className="font-medium capitalize gradient-text">{pokemon.habitat || "Unknown"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Generation</p>
            <p className="font-medium capitalize gradient-text">{pokemon.generation}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Growth Rate</p>
            <p className="font-medium capitalize gradient-text">{pokemon.growthRate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Base Happiness</p>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="font-medium gradient-text">{pokemon.baseHappiness}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 