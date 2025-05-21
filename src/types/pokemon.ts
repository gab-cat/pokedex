export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};

export type PokemonDetails = {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      },
      home: {
        front_default: string;
      },
    },
    front_default: string;
  };
  types: {
    type: {
      name: string;
    }
  }[];
  weight: number;
  height: number;
  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    }
  }[];
  species: {
    url: string;
  };
  moves?: {
    move: {
      name: string;
    };
  }[];
};

export type PokemonSpecies = {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
  genera: {
    genus: string;
    language: {
      name: string;
    };
  }[];
  evolution_chain: {
    url: string;
  };
  color: {
    name: string;
  };
};

export type PokemonBasicInfo = {
  name: string;
  url: string;
};

export type EvolutionChain = {
  name: string;
  url: string;
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChain[];
  is_baby: boolean;
  min_level?: number;
  trigger?: string;
  item?: string;
};