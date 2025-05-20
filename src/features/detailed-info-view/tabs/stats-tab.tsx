"use client";

import { BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PokemonDetails } from "@/types/pokemon";

type StatsTabProps = {
  stats: PokemonDetails["stats"];
};

export function StatsTab({ stats }: StatsTabProps) {
  const getStatPercentage = (stat: number) => {
    return Math.min((stat / 255) * 100, 100);
  };

  const getStatColorClass = (stat: number) => {
    if (stat < 50) return "bg-red-500";
    if (stat < 80) return "bg-yellow-500";
    if (stat < 100) return "bg-green-500";
    return "bg-blue-500";
  };

  return (
    <Card className="animate-popIn" style={{ animationDelay: '0.1s' }}>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-red-500" />
          <h2 className="text-xl font-bold">Base Stats</h2>
        </div>
        <div className="space-y-4">
          {stats.map((stat, index) => {
            const statName = stat.stat.name.replace("-", " ");
            const formattedStatName = statName
              .split(" ")
              .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            // Calculate percentage for progress bar (max stat is typically 255)
            const percentage = getStatPercentage(stat.base_stat);
            const statColor = getStatColorClass(stat.base_stat);

            return (
              <div
                key={stat.stat.name}
                className="animate-slideUp opacity-0"
                style={{ animationDelay: `${150 * index}ms` }}
              >
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{formattedStatName}</span>
                  <span className="text-sm font-medium">{stat.base_stat}</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden stat-bar">
                  <div
                    className={`h-full ${statColor} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}

          {/* Total stats */}
          <div className="pt-2 mt-2 border-t animate-slideUp opacity-0" style={{ animationDelay: `${150 * stats.length}ms` }}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-bold">Total</span>
              <span className="text-sm font-bold">
                {stats.reduce((total: number, stat: { base_stat: number }) => total + stat.base_stat, 0)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 