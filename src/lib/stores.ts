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
  selectedTypes: string[];
  setSelectedType: (type: string) => void;
  toggleSelectedType: (type: string) => void;
  clearSelectedTypes: () => void;
  isTypeSelected: (type: string) => boolean;
}

export const useTypeFilterStore = create<TypeFilterState>()((set, get) => ({
  selectedTypes: [],
  setSelectedType: (type: string) => set({ selectedTypes: [type] }),
  toggleSelectedType: (type: string) => set((state) => {
    if (state.selectedTypes.includes(type)) {
      return { selectedTypes: state.selectedTypes.filter(t => t !== type) };
    } else {
      return { selectedTypes: [...state.selectedTypes, type] };
    }
  }),
  clearSelectedTypes: () => set({ selectedTypes: [] }),
  isTypeSelected: (type: string) => get().selectedTypes.includes(type)
})); 