"use client";

import { useState } from "react";
import {
  Flame, Droplet, Leaf, Zap, Filter, X, Cloud, Mountain, Brain,
  Ghost, Moon, Dumbbell, Bug, Star, Wind,
  Sparkles, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTypeFilterStore } from "@/lib/stores";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";

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
  const { selectedTypes, toggleSelectedType, clearSelectedTypes, isTypeSelected } = useTypeFilterStore();
  const [isOpen, setIsOpen] = useState(false);

  const getTypeLabel = () => {
    if (selectedTypes.length === 0) return "All Types";
    if (selectedTypes.length === 1) {
      const type = selectedTypes[0];
      return type.charAt(0).toUpperCase() + type.slice(1);
    }
    return `${selectedTypes.length} Types Selected`;
  };

  const typeCount = Object.keys(typeIcons).length;
  const selectedCount = selectedTypes.length;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold gradient-text flex items-center gap-2">
          <Filter className="h-5 w-5 text-red-500" />
          Filter by Type
        </h2>
        
        <div className="flex items-center gap-2">
          {selectedTypes.length > 0 && (
            <Button 
              onClick={clearSelectedTypes} 
              variant="outline" 
              size="sm" 
              className="text-xs gap-1"
            >
              <X className="h-3 w-3" />
              Clear filters
            </Button>
          )}
          
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                {getTypeLabel()}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent  className="w-64 max-h-[70vh] overflow-y-auto">
              <DropdownMenuLabel className="flex justify-between">
                <span>Pokémon Types</span>
                <span className="text-xs text-muted-foreground">{selectedCount} of {typeCount} selected</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {Object.entries(typeIcons).map(([type, { icon, color }]) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={isTypeSelected(type)}
                  onCheckedChange={() => toggleSelectedType(type)}
                  className="gap-2"
                >
                  <div className={cn(
                    "flex items-center gap-2 py-0.5",
                  )}>
                    <span className={cn(
                      "flex items-center justify-center rounded-full p-1",
                      color
                    )}>
                      {icon}
                    </span>
                    <span className="capitalize">{type}</span>
                  </div>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {selectedTypes.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedTypes.map(type => {
            const { icon, color } = typeIcons[type];
            return (
              <div
                key={type}
                className={cn(
                  "flex items-center gap-1 rounded-full px-3 py-1",
                  color
                )}
              >
                {icon}
                <span className="capitalize">{type}</span>
                <button
                  onClick={() => toggleSelectedType(type)}
                  className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
} 