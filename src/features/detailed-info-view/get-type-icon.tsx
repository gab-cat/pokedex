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