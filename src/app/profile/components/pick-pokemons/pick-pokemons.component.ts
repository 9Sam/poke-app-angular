import {
   Component,
   inject,
   OnInit,
   output,
   ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { PokemonService } from '@shared/services/pokemon/pokemon.service';
import { PokemonI } from '@shared/interfaces/pokemon.interface';
import { ProfileSmallCardComponent } from '../profile-small-card/profile-small-card.component';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
   selector: 'app-pick-pokemons',
   standalone: true,
   templateUrl: './pick-pokemons.component.html',
   styleUrl: './pick-pokemons.component.scss',
   encapsulation: ViewEncapsulation.None,
   imports: [
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatAutocompleteModule,
      ReactiveFormsModule,
      MatIconModule,
      MatButtonModule,
      AsyncPipe,
      ProfileSmallCardComponent,
      ScrollingModule,
      MatProgressSpinnerModule,
   ],
})
export class PickPokemonsComponent implements OnInit {
   pokemonService = inject(PokemonService);

   pokemonsSelectedEvent = output<Set<number>>();

   pokemonsSub = this.pokemonService.pokemonsSub;
   filteredPokemons: PokemonI[] = [];
   selectedPokemons = new Set<number>();

   searchControl = new FormControl<string | any>('');
   options: any[] = [];
   filteredOptions!: Observable<any[]>;

   constructor() {
      this.searchControl.valueChanges.subscribe((value) => {
         let realValue = '';

         if (value instanceof Object) {
            realValue = value.name;
         } else {
            realValue = value;
         }

         if (realValue) {
            this.filteredPokemons = this.filterPokemons(realValue);
         } else {
            this.filteredPokemons = this.pokemonsSub.getValue();
         }
      });
   }

   ngOnInit() {
      this.filteredOptions = this.searchControl.valueChanges.pipe(
         startWith(''),
         map((value) => {
            const name = typeof value === 'string' ? value : value?.name;
            return name ? this._filter(name as string) : this.options.slice();
         }),
      );

      this.getPokemons();
   }

   getPokemons() {
      this.pokemonService.getPokemons().subscribe((pokemons) => {
         this.pokemonsSub.next(pokemons);
         this.filteredPokemons = pokemons;
         this.options = pokemons;
      });
   }

   updateSelectedPokemons(selectedPokemons: any) {
      const updatedPokemons = this.pokemonsSub.getValue().map((pokemon) => {
         if (selectedPokemons.size === 3) {
            if (selectedPokemons.has(pokemon.id)) {
               pokemon.isSelected = true;
               pokemon.isAvailable = true;
            } else {
               pokemon.isSelected = false;
               pokemon.isAvailable = false;
            }
         } else {
            if (selectedPokemons.has(pokemon.id)) {
               pokemon.isSelected = true;
               pokemon.isAvailable = true;
            } else {
               pokemon.isSelected = false;
               pokemon.isAvailable = true;
            }
         }

         return pokemon;
      });

      this.pokemonsSub.next(updatedPokemons);
   }

   onClickCard(id: number): void {
      const exists = this.selectedPokemons.has(id);

      if (exists) {
         this.selectedPokemons.delete(id);
      } else if (this.selectedPokemons.size < 3) {
         this.selectedPokemons.add(id);
      }

      this.updateSelectedPokemons(this.selectedPokemons);
   }

   onClickContinue(): void {
      this.pokemonsSelectedEvent.emit(this.selectedPokemons);
   }

   displayFn(user: any): string {
      return user && user.name ? user.name : '';
   }

   private filterPokemons(val: string): any[] {
      console.log('filterPokemons', val);

      if (val) {
         const filterValue = val.toLowerCase();

         console.log('filterValue', filterValue);

         return this.pokemonsSub
            .getValue()
            .filter((pokemon) =>
               pokemon.name.toLowerCase().includes(filterValue),
            );
      }

      return [];
   }

   private _filter(name: string): any[] {
      const filterValue = name.toLowerCase();

      return this.options.filter((option) =>
         option.name.toLowerCase().includes(filterValue),
      );
   }
}
