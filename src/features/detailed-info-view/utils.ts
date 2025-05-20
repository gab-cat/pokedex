export function getTypeWeaknesses(types: string[]): string[] {
  // Mapping of each type to what it's weak against
  const typeWeaknessMap: Record<string, string[]> = {
    normal: ["ghost"],
    fighting: ["flying", "poison", "psychic", "bug", "ghost", "fairy"],
    flying: ["rock", "steel", "electric"],
    poison: ["poison", "ground", "rock", "ghost", "steel"],
    ground: ["flying", "bug", "grass"],
    rock: ["fighting", "ground", "steel"],
    bug: ["fighting", "flying", "poison", "ghost", "steel", "fire", "fairy"],
    ghost: ["normal", "dark", "ghost"],
    steel: ["steel", "fire", "water", "electric"],
    fire: ["rock", "fire", "water", "dragon"],
    water: ["water", "grass", "dragon"],
    grass: ["flying", "poison", "bug", "steel", "fire", "grass", "dragon"],
    electric: ["ground", "grass", "electric", "dragon"],
    psychic: ["steel", "psychic", "dark"],
    ice: ["steel", "fire", "water", "ice"],
    dragon: ["steel", "fairy"],
    dark: ["fighting", "dark", "fairy"],
    fairy: ["poison", "steel", "fire"]
  };

  // Collect all weaknesses from the Pokemon's types
  const allWeaknesses = types.flatMap(type => typeWeaknessMap[type] || []);
  
  // Remove duplicates and sort
  return [...new Set(allWeaknesses)].sort();
} 