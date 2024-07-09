import {
   PokemonApiI,
   PokemonI,
   PokemonStatsE,
} from '../../interfaces/pokemon.interface';

const getPokemonStat = (statName: string, pokemonApi: PokemonApiI): number => {
   const stat = pokemonApi.stats.find((stat) => stat.stat.name === statName);

   if (stat) {
      return stat.base_stat;
   }

   return 0;
};

export const mapPokemonApiToPokemon = (pokemonApi: PokemonApiI): PokemonI => {
   return {
      id: pokemonApi.id,
      name: pokemonApi.name,
      sprite: pokemonApi.sprites.other.home.front_default,
      health: getPokemonStat(PokemonStatsE.health, pokemonApi),
      attack: getPokemonStat(PokemonStatsE.attack, pokemonApi),
      defense: getPokemonStat(PokemonStatsE.defense, pokemonApi),
      specialAttack: getPokemonStat(PokemonStatsE.specialAttack, pokemonApi),
      specialDefense: getPokemonStat(PokemonStatsE.specialDefense, pokemonApi),
      speed: getPokemonStat(PokemonStatsE.speed, pokemonApi),
      isAvailable: true,
      isSelected: false,
   } as PokemonI;
};
