import { MetadataRoute } from 'next';

async function fetchAllPokemon() {
  // Fetch the first 151 Pokemon (original generation) - matching what's used in generateStaticParams
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
  
  if (!response.ok) {
    return [];
  }
  
  const data = await response.json();
  return data.results.map((pokemon: { name: string }) => ({
    name: pokemon.name,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pokedex.gab-cat.me';
  
  // Get all Pokemon for dynamic routes
  const allPokemon = await fetchAllPokemon();
  
  // Create the Pokemon routes
  const pokemonRoutes = allPokemon.map((pokemon: { name: string }) => ({
    url: `${baseUrl}/pokemon/${pokemon.name}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  
  // Define static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/favorites`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];
  
  return [...staticRoutes, ...pokemonRoutes];
}
