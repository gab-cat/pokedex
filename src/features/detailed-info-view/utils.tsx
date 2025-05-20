import React from "react";
import {
  Flame,
  Droplet,
  Leaf,
  Star,
  Mountain,
  Wind,
  Bug,
  FlaskRoundIcon as Flask,
  Ghost,
  Moon,
  Snowflake,
  Shield,
  Sparkles,
  Zap,
  Dumbbell,
  Brain
} from "lucide-react";

export function getTypeIcon(type: string): React.ReactNode {
  switch (type) {
  case "fire":
    return <Flame className="h-4 w-4" />;
  case "water":
    return <Droplet className="h-4 w-4" />;
  case "grass":
    return <Leaf className="h-4 w-4" />;
  case "electric":
    return <Zap className="h-4 w-4" />;
  case "psychic":
    return <Brain className="h-4 w-4" />;
  case "fighting":
    return <Dumbbell className="h-4 w-4" />;
  case "rock":
    return <Mountain className="h-4 w-4" />;
  case "ground":
    return <Mountain className="h-4 w-4" />;
  case "flying":
    return <Wind className="h-4 w-4" />;
  case "bug":
    return <Bug className="h-4 w-4" />;
  case "poison":
    return <Flask className="h-4 w-4" />;
  case "normal":
    return <Star className="h-4 w-4" />;
  case "ghost":
    return <Ghost className="h-4 w-4" />;
  case "dragon":
    return <Flame className="h-4 w-4" />;
  case "dark":
    return <Moon className="h-4 w-4" />;
  case "steel":
    return <Shield className="h-4 w-4" />;
  case "fairy":
    return <Sparkles className="h-4 w-4" />;
  case "ice":
    return <Snowflake className="h-4 w-4" />;
  default:
    return <Star className="h-4 w-4" />;
  }
}

export function getTypeWeaknesses(types: string[]): string[] {
  // Mapping of each type to what it's weak against
  const typeWeaknessMap: Record<string, string[]> = {
    normal: ["ghost"],
    fighting: ["flying", "poison", "psychic", "bug", "ghost", "fairy"],
    flying: ["rock", "steel", "electric"],
    poison: ["poison", "ground", "rock", "ghost", "steel"],
    ground: ["flying", "bug", "grass"],
    rock: ["fighting", "ground", "steel"],
    bug: ["fighting", "flying", "poison", "ghost", "steel", "fire", "fairy"],
    ghost: ["normal", "dark", "ghost"],
    steel: ["steel", "fire", "water", "electric"],
    fire: ["rock", "fire", "water", "dragon"],
    water: ["water", "grass", "dragon"],
    grass: ["flying", "poison", "bug", "steel", "fire", "grass", "dragon"],
    electric: ["ground", "grass", "electric", "dragon"],
    psychic: ["steel", "psychic", "dark"],
    ice: ["steel", "fire", "water", "ice"],
    dragon: ["steel", "fairy"],
    dark: ["fighting", "dark", "fairy"],
    fairy: ["poison", "steel", "fire"]
  };

  // Collect all weaknesses from the Pokemon's types
  const allWeaknesses = types.flatMap(type => typeWeaknessMap[type] || []);
  
  // Remove duplicates and sort
  return [...new Set(allWeaknesses)].sort();
} 