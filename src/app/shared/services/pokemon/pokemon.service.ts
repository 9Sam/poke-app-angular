import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, switchMap } from 'rxjs';
import { PokemonApiI, PokemonI } from '../../interfaces/pokemon.interface';
import { HttpClient } from '@angular/common/http';
import { mapPokemonApiToPokemon } from './pokemon.mapper';

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
                           return mapPokemonApiToPokemon(pokemonApi);
                        }),
                     );
                  },
               );
               return forkJoin(pokemonRequests);
            }),
         );
   }

   getPokemon(id: string): Observable<PokemonI> {
      return this.http.get<PokemonApiI>(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
         map((pokemonApi) => {
            return mapPokemonApiToPokemon(pokemonApi);
         }),
      );
   }
}
