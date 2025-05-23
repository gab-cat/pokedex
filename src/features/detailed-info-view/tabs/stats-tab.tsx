"use client";

import { BarChart3, Heart, Shield, Sparkles, Sword, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { PokemonDetails } from "../../../types/pokemon";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatsTabProps = {
  stats: PokemonDetails["stats"];
  primaryType?: string;
};

function getStatIcon(statName: string) {
  switch (statName) {
  case "hp":
    return <Heart className="h-4 w-4" />;
  case "attack":
    return <Sword className="h-4 w-4" />;
  case "defense":
    return <Shield className="h-4 w-4" />;
  case "special-attack":
    return <Sparkles className="h-4 w-4" />;
  case "special-defense":
    return <Shield className="h-4 w-4" />;
  case "speed":
    return <Zap className="h-4 w-4" />;
  default:
    return <BarChart3 className="h-4 w-4" />;
  }
}
export function StatsTab({ stats, primaryType = "normal" }: StatsTabProps) {
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    setAnimated(true);
  }, []);

  const getStatPercentage = (stat: number) => {
    return Math.min((stat / 255) * 100, 100);
  };

  const getStatColorClass = (statName: string) => {
    switch (statName) {
    case "hp":
      return "bg-[#7AC74C]"; // Bright green
    case "attack":
      return "bg-[#F8702A]"; // Orange
    case "defense":
      return "bg-[#E2933B]"; // Reddish orange
    case "special-attack":
      return "bg-[#6390F0]"; // Light blue
    case "special-defense":
      return "bg-[#7B62A3]"; // Blue/purple
    case "speed":
      return "bg-[#F7659B]"; // Pink/magenta
    default:
      return "bg-gray-500";
    }
  };

  return (
    <Card className={cn(
      "border",
      `border-${primaryType === 'normal' ? 'gray-300' : `type-${primaryType}/50`}`
    )}>
      <CardContent className="p-4 py-0">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className={`h-5 w-5 text-type-${primaryType}`} />
          <h2 className={cn(
            "text-xl font-bold",
            primaryType === "normal" ? "gradient-text" : `text-type-${primaryType}`
          )}>Base Stats</h2>
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
            const statColor = getStatColorClass(stat.stat.name);

            return (
              <div
                key={stat.stat.name}
                className="animate-slideUp opacity-0"
                style={{ animationDelay: `${150 * index}ms` }}
              >
                <div className="flex justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{getStatIcon(stat.stat.name)}</span>
                    <span className="text-sm font-medium">{formattedStatName}</span>
                  </div>
                  <span className="text-sm font-medium">{stat.base_stat}</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden stat-bar">
                  <div
                    className={`h-full ${statColor} rounded-full transition-all duration-1000 ease-out`}
                    style={{ 
                      width: animated ? `${percentage}%` : '0%',
                      transition: 'width 1s ease-out'
                    }}
                  ></div>
                </div>
              </div>
            );
          })}

          {/* Total stats */}
          <div className="pt-2 mt-2 border-t animate-slideUp opacity-0" style={{ animationDelay: `${150 * stats.length}ms` }}>
            <div className="flex justify-between mb-1">
              <span className={`text-base font-bold text-type-${primaryType}`} >Total</span>
              <span className={`text-base font-bold text-type-${primaryType}`}>
                {stats.reduce((total: number, stat: { base_stat: number }) => total + stat.base_stat, 0)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 