import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PokemonView } from "@/features/detailed-info-view/pokemon-view";

type PokemonPageProps = {
  params: Promise<{
    name: string;
  }>;
};

export async function generateMetadata({ params }: PokemonPageProps): Promise<Metadata> {
  const formattedName = (await params).name.charAt(0).toUpperCase() + (await params).name.slice(1);
  
  return {
    title: `${formattedName} | Pokédex`,
    description: `Learn all about ${formattedName}, including its type, abilities, stats, and more.`,
  };
}

async function getPokemonData(name: string) {
  try {
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if (!pokemonResponse.ok) {
      return null;
    }

    const pokemonData = await pokemonResponse.json();

    // Get species data for description
    const speciesResponse = await fetch(pokemonData.species.url);
    const speciesData = await speciesResponse.json();

    // Get evolution chain data
    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionResponse.json();

    // Process evolution chain
    const evolutionChain = processEvolutionChain(evolutionData.chain);

    return {
      ...pokemonData,
      description: getEnglishDescription(speciesData),
      genus: getEnglishGenus(speciesData),
      evolutionChain,
      habitat: speciesData.habitat?.name || "Unknown",
      generation: speciesData.generation.name.replace("-", " "),
      growthRate: speciesData.growth_rate.name.replace("-", " "),
      captureRate: speciesData.capture_rate,
      baseHappiness: speciesData.base_happiness,
    };
  } catch (error) {
    console.error(`Error fetching data for ${name}:`, error);
    return null;
  }
}

// Define a recursive type for evolves_to
type EvolutionNode = {
  species: {
    name: string;
    url: string;
  };
  evolution_details: Array<{
    min_level?: number | null;
    trigger?: { name: string };
    item?: { name: string };
  }>;
  evolves_to: EvolutionNode[];
};

function processEvolutionChain(chain: {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionNode[];
}) {
  const evolutions = [];

  // Add the base form
  evolutions.push({
    name: chain.species.name,
    url: chain.species.url,
    min_level: null,
  });

  // Process the evolution chain recursively
  let currentEvolution = chain.evolves_to;

  while (currentEvolution && currentEvolution.length > 0) {
    const evolution = currentEvolution[0];
    evolutions.push({
      name: evolution.species.name,
      url: evolution.species.url,
      min_level: evolution.evolution_details[0]?.min_level || null,
      trigger: evolution.evolution_details[0]?.trigger?.name || null,
      item: evolution.evolution_details[0]?.item?.name || null,
    });

    currentEvolution = evolution.evolves_to;
  }

  return evolutions;
}

function getEnglishDescription(speciesData: {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
}) {
  const entry = speciesData.flavor_text_entries.find((entry) => entry.language.name === "en");
  return entry ? entry.flavor_text.replace(/\f/g, " ") : "No description available.";
}

function getEnglishGenus(speciesData: {
  genera: Array<{
    genus: string;
    language: {
      name: string;
    };
  }>;
}) {
  const genus = speciesData.genera.find((genus) => genus.language.name === "en");
  return genus ? genus.genus : "Unknown";
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const name = (await params).name;
  const pokemon = await getPokemonData(name);

  if (!pokemon) {
    notFound();
  }

  return <PokemonView pokemon={pokemon} name={name} />;
}
