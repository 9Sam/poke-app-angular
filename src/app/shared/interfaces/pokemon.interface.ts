export enum PokemonStatsE {
   'health' = 'hp',
   'attack' = 'attack',
   'defense' = 'defense',
   'specialAttack' = 'special-attack',
   'specialDefense' = 'special-defense',
   'speed' = 'speed',
}

export interface PokemonI {
   id: number;
   name: string;
   sprite: string;
   health: number;
   attack: number;
   defense: number;
   specialAttack: number;
   specialDefense: number;
   speed: number;
   isAvailable?: boolean;
   isSelected?: boolean;
}

export interface PokemonApiI {
   id: number;
   name: string;
   sprites: {
      other: {
         home: {
            front_default: string;
         };
      };
   };
   stats: [
      {
         base_stat: number;
         effort: number;
         stat: {
            name: string;
            url: string;
         };
      },
   ];
}
