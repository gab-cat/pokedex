import { useQuery } from '@tanstack/react-query';
import { useApiClient } from './api';
import { 
  Pokemon,
  PokemonListResponse, 
  PokemonDetails, 
  PokemonSpecies 
} from '@/types/pokemon';

export function usePokemonList(limit = 20, offset = 0) {
  const apiClient = useApiClient();
  
  return useQuery({
    queryKey: ['pokemonList', limit, offset],
    queryFn: () => apiClient.get<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`),
  });
}

export function usePokemonDetails(name: string) {
  const apiClient = useApiClient();
  
  return useQuery({
    queryKey: ['pokemonDetails', name],
    queryFn: () => apiClient.get<PokemonDetails>(`/pokemon/${name}`),
    enabled: !!name,
  });
}

export function usePokemonSpecies(id: number) {
  const apiClient = useApiClient();
  
  return useQuery({
    queryKey: ['pokemonSpecies', id],
    queryFn: () => apiClient.get<PokemonSpecies>(`/pokemon-species/${id}`),
    enabled: !!id,
  });
}

export function useSearchPokemon(searchTerm: string) {
  const apiClient = useApiClient();
  
  return useQuery({
    queryKey: ['searchPokemon', searchTerm],
    queryFn: async () => {
      const data = await apiClient.get<PokemonListResponse>(`/pokemon?limit=1000&offset=0`);
      return {
        results: data.results.filter((pokemon: Pokemon) => 
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      };
    },
    enabled: !!searchTerm && searchTerm.length > 1,
  });
}

export function usePokemonByType(type: string | null, limit = 10, offset = 0) {
  const apiClient = useApiClient();
  
  return useQuery({
    queryKey: ['pokemonByType', type, limit, offset],
    queryFn: async () => {
      if (!type) return { pokemon: [], hasMore: false };
      
      // Get all Pokémon of the specified type
      const data = await apiClient.get<{ pokemon: { pokemon: Pokemon }[] }>(`/type/${type}/?limit=${limit}&offset=${offset}`);
      const allPokemon = data.pokemon.map(entry => entry.pokemon);
      
      // Apply pagination to the results
      const paginatedPokemon = allPokemon.slice(offset, offset + limit);
      const hasMore = offset + limit < allPokemon.length;
      
      return {
        results: paginatedPokemon,
        count: allPokemon.length,
        hasMore: hasMore,
        next: hasMore ? `offset=${offset + limit}` : null,
        previous: offset > 0 ? `offset=${Math.max(0, offset - limit)}` : null
      };
    },
    enabled: !!type,
  });
} 