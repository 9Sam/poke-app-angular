import { Component, inject, Input, output } from '@angular/core';
import { PokemonI } from '@shared/interfaces/pokemon.interface';
import { PokemonService } from '@shared/services/pokemon/pokemon.service';

@Component({
   selector: 'app-profile-small-card',
   standalone: true,
   imports: [],
   templateUrl: './profile-small-card.component.html',
   styleUrl: './profile-small-card.component.scss',
})
export class ProfileSmallCardComponent {
   @Input() pokemon: PokemonI = {} as PokemonI;

   pokemonService = inject(PokemonService);

   clickCardEvent = output<number>();

   onClickCard(): void {
      this.clickCardEvent.emit(this.pokemon.id);
   }
}
