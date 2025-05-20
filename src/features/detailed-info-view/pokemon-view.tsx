import { PokemonHeader } from "./pokemon-header";
import { PokemonShowcase } from "./pokemon-showcase";
import { PokemonDetails } from "./pokemon-details";
import { AboutTab } from "./tabs";

type PokemonViewProps = {
  pokemon: {
    id: number;
    name?: string;
    description: string;
    sprites: {
      other: {
        "official-artwork": {
          front_default: string;
        };
      };
    };
    types: {
      type: {
        name: string;
      };
    }[];
    height: number;
    weight: number;
    stats: {
      base_stat: number;
      stat: {
        name: string;
      };
    }[];
    abilities: {
      ability: {
        name: string;
        url?: string;
      };
      is_hidden: boolean;
      description?: string;
    }[];
    moves: {
      move: {
        name: string;
      };
    }[];
    genus?: string;
    evolutionChain?: {
      name: string;
      url: string;
      min_level: number | null;
      trigger?: string;
      item?: string;
    }[];
    habitat?: string;
    generation: string;
    growthRate: string;
    captureRate: number;
    baseHappiness: number;
  };
  name: string;
};

export function PokemonView({ pokemon, name }: PokemonViewProps) {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <PokemonHeader pokemonId={pokemon.id} name={name} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slideUp">
          <div className="flex flex-col gap-8">
            <PokemonShowcase pokemon={pokemon} name={name} />
            <AboutTab pokemon={pokemon} />
          </div>
          <PokemonDetails pokemon={pokemon} />
        </div>
      </div>
    </main>
  );
} 