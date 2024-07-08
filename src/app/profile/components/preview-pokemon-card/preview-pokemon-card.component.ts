import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
   selector: 'app-preview-pokemon-card',
   standalone: true,
   imports: [MatProgressBarModule],
   templateUrl: './preview-pokemon-card.component.html',
   styleUrl: './preview-pokemon-card.component.scss',
})
export class PreviewPokemonCardComponent {}
