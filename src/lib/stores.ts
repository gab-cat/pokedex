import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[];
  addFavorite: (pokemonName: string) => void;
  removeFavorite: (pokemonName: string) => void;
  isFavorite: (pokemonName: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (pokemonName: string) => 
        set((state) => ({
          favorites: [...state.favorites, pokemonName]
        })),
      removeFavorite: (pokemonName: string) => 
        set((state) => ({
          favorites: state.favorites.filter(name => name !== pokemonName)
        })),
      isFavorite: (pokemonName: string) => 
        get().favorites.includes(pokemonName)
    }),
    {
      name: 'pokedex-favorites',
    }
  )
);

// Type store to filter Pokémon by type
interface TypeFilterState {
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
}

export const useTypeFilterStore = create<TypeFilterState>()((set) => ({
  selectedType: null,
  setSelectedType: (type: string | null) => set({ selectedType: type })
})); 