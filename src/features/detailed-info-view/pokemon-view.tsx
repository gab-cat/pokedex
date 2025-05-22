import { PokemonHeader } from "./pokemon-header";
import { PokemonShowcase } from "./pokemon-showcase";
import { PokemonDetails } from "./pokemon-details";
import { AboutTab } from "./tabs";
import { EvolutionChain, PokemonDetails as PokemonDetailsType } from "@/types/pokemon";

type PokemonViewProps = {
  pokemon: Pick<PokemonDetailsType, 'id' | 'sprites' | 'types' | 'height' | 'weight' | 'stats'> & {
    name?: string;
    description: string;
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
    evolutionChain?: Array<Omit<EvolutionChain, 'species' | 'evolves_to' | 'is_baby'> & {
      min_level: number | null;
    }>;
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