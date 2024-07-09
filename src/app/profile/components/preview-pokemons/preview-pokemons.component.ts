import { Component, inject, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PreviewPokemonCardComponent } from '../preview-pokemon-card/preview-pokemon-card.component';
import { UserService } from '@shared/services/user/user.service';
import { UserI } from '@shared/services/user/interfaces/user.interface';
import { Router } from '@angular/router';
import { PokemonI } from '@shared/interfaces/pokemon.interface';

@Component({
   selector: 'app-preview-pokemons',
   standalone: true,
   templateUrl: './preview-pokemons.component.html',
   styleUrl: './preview-pokemons.component.scss',
   imports: [MatIconModule, MatButtonModule, PreviewPokemonCardComponent],
})
export class PreviewPokemonsComponent implements OnInit {
   userService = inject(UserService);
   router = inject(Router);

   pokemons = input<PokemonI[]>([]);

   maxStat: number = 0;

   currentUser: UserI = {} as UserI;

   constructor() {}

   ngOnInit() {
      this.userService.getCurrentUser().subscribe((user) => {
         if (user) {
            this.currentUser = user;
         } else {
            this.router.navigate(['/']);
         }
      });

      this.updateMaxStat();
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
