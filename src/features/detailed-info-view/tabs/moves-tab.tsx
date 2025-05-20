"use client";

import { Swords } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type MovesTabProps = {
  moves: {
    move: {
      name: string;
    };
  }[];
};

export function MovesTab({ moves }: MovesTabProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Swords className="h-5 w-5 text-red-500" />
          <h2 className="text-xl font-bold">Moves</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {moves?.slice(0, 20).map((move, index) => {
            const moveName = move.move.name.replace("-", " ");
            const formattedMoveName = moveName
              .split(" ")
              .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            return (
              <span
                key={move.move.name}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm animate-bounce-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {formattedMoveName}
              </span>
            );
          })}
          {moves && moves.length > 20 && (
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              +{moves.length - 20} more
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 