import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PreviewPokemonCardComponent } from '../preview-pokemon-card/preview-pokemon-card.component';

@Component({
   selector: 'app-preview-pokemons',
   standalone: true,
   templateUrl: './preview-pokemons.component.html',
   styleUrl: './preview-pokemons.component.scss',
   imports: [MatIconModule, MatButtonModule, PreviewPokemonCardComponent],
})
export class PreviewPokemonsComponent {}
