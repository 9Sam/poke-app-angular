import { Component, input } from '@angular/core';
import { ProgressBarComponent } from '@shared/components/progress-bar/progress-bar.component';
import { PokemonI } from '@shared/interfaces/pokemon.interface';

const maxStats = {
   health: 255,
   attack: 190,
   defense: 230,
   specialAttack: 194,
   specialDefense: 230,
   speed: 180,
};

@Component({
   selector: 'app-preview-pokemon-card',
   standalone: true,
   templateUrl: './preview-pokemon-card.component.html',
   styleUrl: './preview-pokemon-card.component.scss',
   imports: [ProgressBarComponent],
})
export class PreviewPokemonCardComponent {
   pokemon = input<PokemonI>();

   calculatePercentage(statName: string, value: number): number {
      return (value / maxStats[statName as keyof typeof maxStats]) * 100;
   }
}
