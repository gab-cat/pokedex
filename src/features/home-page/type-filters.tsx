"use client";

import {
  Flame, Droplet, Leaf, Zap, Filter, X, Cloud, Mountain, Brain,
  Ghost, Moon, Dumbbell, Bug, Star, Wind,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTypeFilterStore } from "@/lib/stores";
import { cn } from "@/lib/utils";

// All Pokémon types with icons and colors
const typeIcons: Record<string, { icon: React.ReactNode; color: string; textColor: string }> = {
  normal: { icon: <Star className="h-5 w-5 text-gray-500" />, color: "bg-gray-100", textColor: "text-gray-700" },
  fire: { icon: <Flame className="h-5 w-5 text-red-500" />, color: "bg-red-100", textColor: "text-red-700" },
  water: { icon: <Droplet className="h-5 w-5 text-blue-500" />, color: "bg-blue-100", textColor: "text-blue-700" },
  grass: { icon: <Leaf className="h-5 w-5 text-green-500" />, color: "bg-green-100", textColor: "text-green-700" },
  electric: { icon: <Zap className="h-5 w-5 text-yellow-500" />, color: "bg-yellow-100", textColor: "text-yellow-700" },
  ice: { icon: <Cloud className="h-5 w-5 text-cyan-500" />, color: "bg-cyan-100", textColor: "text-cyan-700" },
  fighting: { icon: <Dumbbell className="h-5 w-5 text-orange-500" />, color: "bg-orange-100", textColor: "text-orange-700" },
  poison: { icon: <Droplet className="h-5 w-5 text-purple-500" />, color: "bg-purple-100", textColor: "text-purple-700" },
  ground: { icon: <Mountain className="h-5 w-5 text-amber-500" />, color: "bg-amber-100", textColor: "text-amber-700" },
  flying: { icon: <Wind className="h-5 w-5 text-sky-500" />, color: "bg-sky-100", textColor: "text-sky-700" },
  psychic: { icon: <Brain className="h-5 w-5 text-pink-500" />, color: "bg-pink-100", textColor: "text-pink-700" },
  bug: { icon: <Bug className="h-5 w-5 text-lime-500" />, color: "bg-lime-100", textColor: "text-lime-700" },
  rock: { icon: <Mountain className="h-5 w-5 text-stone-500" />, color: "bg-stone-100", textColor: "text-stone-700" },
  ghost: { icon: <Ghost className="h-5 w-5 text-indigo-500" />, color: "bg-indigo-100", textColor: "text-indigo-700" },
  dragon: { icon: <Flame className="h-5 w-5 text-violet-500" />, color: "bg-violet-100", textColor: "text-violet-700" },
  dark: { icon: <Moon className="h-5 w-5 text-gray-700" />, color: "bg-gray-200", textColor: "text-gray-800" },
  steel: { icon: <Star className="h-5 w-5 text-slate-500" />, color: "bg-slate-100", textColor: "text-slate-700" },
  fairy: { icon: <Sparkles className="h-5 w-5 text-rose-500" />, color: "bg-rose-100", textColor: "text-rose-700" },
};

export function TypeFilters() {
  const { selectedType, setSelectedType } = useTypeFilterStore();

  const handleTypeClick = (type: string) => {
    if (selectedType === type) {
      setSelectedType(null);
    } else {
      setSelectedType(type);
    }
  };

  const clearFilter = () => {
    setSelectedType(null);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filter by Type
        </h2>
        {selectedType && (
          <Button 
            onClick={clearFilter} 
            variant="outline" 
            size="sm" 
            className="text-xs gap-1"
          >
            <X className="h-3 w-3" />
            Clear filter
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap justify-center gap-2">
        {Object.entries(typeIcons).map(([type, { icon, color, textColor }]) => (
          <button 
            key={type}
            onClick={() => handleTypeClick(type)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleTypeClick(type);
              }
            }}
            tabIndex={0}
            aria-pressed={selectedType === type}
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5 animate-bounce-in",
              "transition-all cursor-pointer text-sm",
              color,
              textColor,
              "hover:bg-gray-900/90 hover:text-white",
              selectedType === type && "ring-2 ring-gray-900 shadow-md"
            )}
          >
            {icon}
            <span className="font-medium">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
} 