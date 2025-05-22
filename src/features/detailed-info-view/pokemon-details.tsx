"use client";

import { BarChart3, Swords, Zap } from "lucide-react";
import { StatsTab, AbilitiesTab, MovesTab, EvolutionTab } from "./tabs";
import { EvolutionChain, PokemonDetails as PokemonDetailsType } from "@/types/pokemon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type PokemonDetailsProps = {
  pokemon: Pick<PokemonDetailsType, 'id' | 'stats'> & {
    name?: string;
    description: string;
    abilities: Array<{
      ability: {
        name: string;
        url?: string;
      };
      is_hidden: boolean;
      description?: string;
    }>;
    moves: {
      move: {
        name: string;
      };
    }[];
    evolutionChain?: Array<Omit<EvolutionChain, 'species' | 'evolves_to' | 'is_baby'> & {
      min_level: number | null;
    }>;
    habitat?: string;
    generation: string;
    growthRate: string;
    captureRate: number;
    baseHappiness: number;
    genus?: string;
  };
  primaryType?: string;
};

export function PokemonDetails({ pokemon, primaryType = "normal" }: PokemonDetailsProps) {
  const enhancedAbilities = pokemon.abilities.map(ability => {
    const descriptions: Record<string, string> = {
      "overgrow": "Powers up Grass-type moves when the Pokémon's HP is low.",
      "blaze": "Powers up Fire-type moves when the Pokémon's HP is low.",
      "torrent": "Powers up Water-type moves when the Pokémon's HP is low.",
      "shield-dust": "Blocks the added effects of attacks taken.",
      "compound-eyes": "Improves the Pokémon's accuracy.",
      "swarm": "Powers up Bug-type moves when the Pokémon's HP is low.",
      "keen-eye": "Prevents the Pokémon from losing accuracy.",
      "run-away": "Enables a sure getaway from wild Pokémon.",
      "intimidate": "Lowers the opposing Pokémon's Attack stat.",
      "static": "The Pokémon may paralyze attackers that make direct contact.",
      "chlorophyll": "Boosts the Pokémon's Speed stat in harsh sunlight.",
      "levitate": "Gives the Pokémon immunity to Ground-type moves.",
      "synchronize": "Passes on a burn, poison, or paralysis to the Pokémon that inflicted it.",
      "clear-body": "Prevents other Pokémon from lowering its stats.",
      "natural-cure": "All status conditions heal when the Pokémon switches out.",
      "lightning-rod": "The Pokémon draws in all Electric-type moves to boost its Sp. Atk stat.",
      "serene-grace": "Boosts the likelihood of additional effects occurring when the Pokémon uses its moves.",
      "swift-swim": "Boosts the Pokémon's Speed stat in rain.",
      "flash-fire": "Powers up the Pokémon's Fire-type moves if it's hit by a Fire-type move.",
      "protean": "Changes the Pokémon's type to match the move it's about to use.",
    };

    return {
      ...ability,
      description: ability.description || descriptions[ability.ability.name] 
    };
  });

  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="stats" className="w-full rounded-full">
        <TabsList className={cn(
          "grid grid-cols-3 mb-4 rounded-full pb-2",
          `bg-type-${primaryType}/10`
        )}>
          <TabsTrigger 
            value="stats" 
            className="flex items-center gap-1 rounded-full data-[state=active]:text-foreground data-[state=active]:bg-background"
            style={{
              '--tab-active-text': `var(--type-${primaryType})`,
              '--tab-active-bg': `var(--type-${primaryType}-20)`
            } as React.CSSProperties}
          >
            <BarChart3 className="h-4 w-4" />
            Stats
          </TabsTrigger>
          <TabsTrigger 
            value="abilities" 
            className="flex items-center gap-1 rounded-full data-[state=active]:text-foreground data-[state=active]:bg-background"
            style={{
              '--tab-active-text': `var(--type-${primaryType})`,
              '--tab-active-bg': `var(--type-${primaryType}-20)`
            } as React.CSSProperties}
          >
            <Zap className="h-4 w-4" />
            Abilities
          </TabsTrigger>
          <TabsTrigger 
            value="moves" 
            className="flex items-center gap-1 rounded-full data-[state=active]:text-foreground data-[state=active]:bg-background"
            style={{
              '--tab-active-text': `var(--type-${primaryType})`,
              '--tab-active-bg': `var(--type-${primaryType}-20)`
            } as React.CSSProperties}
          >
            <Swords className="h-4 w-4" />
            Moves
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="mt-0">
          <StatsTab stats={pokemon.stats} primaryType={primaryType} />
        </TabsContent>
        <TabsContent value="abilities" className="mt-0">
          <AbilitiesTab abilities={enhancedAbilities} pokemon={pokemon as unknown as PokemonDetailsType} primaryType={primaryType} />
        </TabsContent>

        <TabsContent value="moves" className="mt-0">
          <MovesTab moves={pokemon.moves} primaryType={primaryType} />
        </TabsContent>
      </Tabs>

      {/* Evolution Chain */}
      {pokemon.evolutionChain && pokemon.evolutionChain.length > 0 && (
        <EvolutionTab 
          evolutionChain={pokemon.evolutionChain as unknown as EvolutionChain[]} 
          currentPokemonName={pokemon.name || ""}
          primaryType={primaryType}
        />
      )}
    </div>
  );
}