import {
   ChangeDetectionStrategy,
   Component,
   CUSTOM_ELEMENTS_SCHEMA,
   inject,
   input,
   OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PreviewPokemonCardComponent } from '../preview-pokemon-card/preview-pokemon-card.component';
import { UserService } from '@shared/services/user/user.service';
import { Router } from '@angular/router';
import { PokemonI } from '@shared/interfaces/pokemon.interface';
import { register } from 'swiper/element/bundle';
register();

@Component({
   selector: 'app-preview-pokemons',
   standalone: true,
   templateUrl: './preview-pokemons.component.html',
   styleUrl: './preview-pokemons.component.scss',
   imports: [MatIconModule, MatButtonModule, PreviewPokemonCardComponent],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewPokemonsComponent implements OnInit {
   userService = inject(UserService);
   router = inject(Router);

   pokemons = input<PokemonI[]>([]);

   maxStat: number = 0;

   constructor() {}

   ngOnInit() {
      this.userService.getUser().subscribe((user) => {
         if (!user) {
            this.router.navigate(['/']);
         }
      });

      this.updateMaxStat();
   }

   onEditPokemons() {
      this.router.navigate(['/pokemons/edit']);
   }

   updateMaxStat(): void {
      const statsProperties = [
         'health',
         'attack',
         'defense',
         'specialAttack',
         'specialDefense',
         'speed',
      ];

      const stats = statsProperties.map((property) =>
         this.pokemons().map(
            (pokemon: PokemonI) => pokemon[property as keyof PokemonI],
         ),
      );

      this.maxStat = Math.max(...(stats.flat() as number[]));
   }
}
