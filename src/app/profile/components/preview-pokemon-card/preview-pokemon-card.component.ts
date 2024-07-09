import { Component, input } from '@angular/core';
import { ProgressBarComponent } from '@shared/components/progress-bar/progress-bar.component';
import { PokemonI } from '@shared/interfaces/pokemon.interface';

@Component({
   selector: 'app-preview-pokemon-card',
   standalone: true,
   templateUrl: './preview-pokemon-card.component.html',
   styleUrl: './preview-pokemon-card.component.scss',
   imports: [ProgressBarComponent],
})
export class PreviewPokemonCardComponent {
   pokemon = input<PokemonI>();
   maxStat = input<number>(2000);

   calculatePercentage(value: number): number {
      return (value / this.maxStat()) * 100;
   }
}
