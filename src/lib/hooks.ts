import { useQuery } from '@tanstack/react-query';
import { 
  Pokemon,
  PokemonListResponse, 
  PokemonDetails, 
  PokemonSpecies 
} from '../types/pokemon';
import { useApiClient } from './api';

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

export function useSearchPokemon(searchTerm: string, filters?: { type: 'name' | 'id' }, sort?: { field: 'name' | 'id', order: 'asc' | 'desc' }) {
  const apiClient = useApiClient();
  
  return useQuery({
    queryKey: ['searchPokemon', searchTerm, filters, sort],
    queryFn: async () => {
      const data = await apiClient.get<PokemonListResponse>(`/pokemon?limit=1302&offset=0`);
      
      // Filter results based on the search term
      let results = data.results.filter((pokemon: Pokemon) => {
        if (!searchTerm || searchTerm.length < 2) return true;
        
        // Get the ID from the URL
        const numericId = getPokemonIdFromUrl(pokemon.url);
        
        // Format ID with leading zeros for proper searching (001, 025, etc.)
        const id = numericId < 100 ? numericId.toString().padStart(3, '0') : numericId.toString();
        
        if (filters?.type === 'id') {
          // Filter by ID only
          const formattedSearchTerm = searchTerm.padStart(3, '0');
          return id.includes(formattedSearchTerm);
        } else if (filters?.type === 'name') {
          // Filter by name only
          return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
        } else {
          // Filter by both ID and name (default)
          const formattedSearchTerm = isNumeric(searchTerm) && parseInt(searchTerm) < 100 
            ? searchTerm.padStart(3, '0') 
            : searchTerm;
            
          return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) || id.includes(formattedSearchTerm);
        }
      });
      
      // Sort the results if specified
      if (sort) {
        results = [...results].sort((a, b) => {
          if (sort.field === 'name') {
            // Sort by name
            return sort.order === 'asc' 
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          } else {
            // Sort by ID
            const idA = getPokemonIdFromUrl(a.url);
            const idB = getPokemonIdFromUrl(b.url);
            
            return sort.order === 'asc' 
              ? idA - idB 
              : idB - idA;
          }
        });
      }
      
      return { results };
    },
    enabled: !!searchTerm && searchTerm.length > 1,
  });
}

// Helper to check if a string contains only numbers
function isNumeric(str: string) {
  return /^\d+$/.test(str);
}

// Utility function to extract Pokemon ID from URL
export const getPokemonIdFromUrl = (url: string): number => {
  const urlParts = url.split('/');
  return parseInt(urlParts[urlParts.length - 2], 10);
};

export function usePokemonByType(types: string[], limit = 10, offset = 0, sort?: { field: 'name' | 'id', order: 'asc' | 'desc' }) {
  const apiClient = useApiClient();
  
  return useQuery({
    queryKey: ['pokemonByType', types, limit, offset, sort],
    queryFn: async () => {
      if (!types || types.length === 0) return { pokemon: [], hasMore: false };
      
      // Create an array to hold all Pokemon from all selected types
      let allPokemon: Pokemon[] = [];
      
      // If we have multiple types, we need to fetch each one
      for (const type of types) {
        const typeData = await apiClient.get<{ pokemon: { pokemon: Pokemon }[] }>(`/type/${type}/?limit=1000`);
        // Extract just the Pokemon objects and add to our array
        const typePokemon = typeData.pokemon.map(entry => entry.pokemon);
        
        if (types.length === 1) {
          // For a single type, we can just return these Pokemon
          allPokemon = typePokemon;
          break;
        } else {
          // If this is not the first type, we need to find the intersection
          if (allPokemon.length === 0) {
            allPokemon = typePokemon;
          } else {
            // Find Pokemon that exist in both the current list and this type's list
            // We identify Pokemon by name since that's unique
            allPokemon = allPokemon.filter(p1 => 
              typePokemon.some(p2 => p2.name === p1.name)
            );
          }
        }
      }

      // Sort the results if specified
      if (sort) {
        allPokemon = [...allPokemon].sort((a, b) => {
          if (sort.field === 'name') {
            // Sort by name
            return sort.order === 'asc' 
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          } else {
            // Sort by ID
            const idA = getPokemonIdFromUrl(a.url);
            const idB = getPokemonIdFromUrl(b.url);
            
            return sort.order === 'asc' 
              ? idA - idB 
              : idB - idA;
          }
        });
      }
      
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
    enabled: !!types && types.length > 0,
  });
} 