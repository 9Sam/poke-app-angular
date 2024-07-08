import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, switchMap } from 'rxjs';
import {
   PokemonApiI,
   PokemonI,
   PokemonStatsE,
} from '../../interfaces/pokemon.interface';
import { HttpClient } from '@angular/common/http';

type PokeApiResponse = {
   count: number;
   next: string;
   previous: string;
   results: [{ name: string; url: string }];
};

@Injectable({
   providedIn: 'root',
})
export class PokemonService {
   http = inject(HttpClient);

   pokemonsSub = new BehaviorSubject<PokemonI[]>([]);

   getPokemons(): Observable<PokemonI[]> {
      return this.http
         .get<PokeApiResponse>('https://pokeapi.co/api/v2/pokemon/')
         .pipe(
            switchMap((data: PokeApiResponse) => {
               const pokemonRequests: Observable<PokemonI>[] = data.results.map(
                  (pokemon) => {
                     return this.http.get<PokemonApiI>(pokemon.url).pipe(
                        map((pokemonApi) => {
                           return {
                              id: pokemonApi.id,
                              name: pokemonApi.name,
                              sprite:
                                 pokemonApi.sprites.other.home.front_default,
                              health: this.getPokemonStat(
                                 PokemonStatsE.health,
                                 pokemonApi,
                              ),
                              attack: this.getPokemonStat(
                                 PokemonStatsE.attack,
                                 pokemonApi,
                              ),
                              defense: this.getPokemonStat(
                                 PokemonStatsE.defense,
                                 pokemonApi,
                              ),
                              specialAttack: this.getPokemonStat(
                                 PokemonStatsE.specialAttack,
                                 pokemonApi,
                              ),
                              specialDefense: this.getPokemonStat(
                                 PokemonStatsE.specialDefense,
                                 pokemonApi,
                              ),
                              speed: this.getPokemonStat(
                                 PokemonStatsE.speed,
                                 pokemonApi,
                              ),
                              isAvailable: true,
                              isSelected: false,
                           } as PokemonI;
                        }),
                     );
                  },
               );
               return forkJoin(pokemonRequests);
            }),
         );
   }

   getPokemon(url: string): Observable<PokemonI> {
      return this.http.get<PokemonI>(url);
   }

   private getPokemonStat(statName: string, pokemonApi: PokemonApiI): number {
      const stat = pokemonApi.stats.find((stat) => stat.stat.name === statName);

      if (stat) {
         return stat.base_stat;
      }

      return 0;
   }
}
