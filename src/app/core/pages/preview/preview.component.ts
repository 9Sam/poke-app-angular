import { Component, inject, signal } from '@angular/core';
import { LoadingIndicatorComponent } from '@shared/components/loading-indicator/loading-indicator.component';
import { ProfileImageComponent } from '@profile/components/profile-image/profile-image.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { UserService } from '@shared/services/user/user.service';
import { UserI } from '@shared/services/user/interfaces/user.interface';
import { PreviewPokemonsComponent } from '@profile/components/preview-pokemons/preview-pokemons.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PokemonService } from '@shared/services/pokemon/pokemon.service';
import { forkJoin } from 'rxjs';
import { PokemonI } from '@shared/interfaces/pokemon.interface';

@Component({
   selector: 'app-preview',
   standalone: true,
   templateUrl: './preview.component.html',
   styleUrl: './preview.component.scss',
   imports: [
      LoadingIndicatorComponent,
      ProfileImageComponent,
      HeaderComponent,
      PreviewPokemonsComponent,
      MatButtonModule,
      MatDividerModule,
      MatIconModule,
   ],
})
export class PreviewComponent {
   userService = inject(UserService);
   pokemonService = inject(PokemonService);

   pokemons: PokemonI[] = [];

   user = signal<UserI | undefined>({} as UserI);

   constructor() {
      this.userService.getCurrentUser().subscribe((user) => {
         this.user.set(user);

         this.getThreePokemons(user?.pokemons ?? []);
      });
   }

   getThreePokemons(ids: number[]): void {
      const requests = ids.map((id) =>
         this.pokemonService.getPokemon(id.toString()),
      );

      forkJoin(requests).subscribe(
         (results) => {
            this.pokemons = results;
         },
         (error) => {
            console.error('Error:', error);
         },
      );
   }

   getTitle() {
      return this.user()
         ? '¡Hola ' + this.user()?.name + '!'
         : 'Previsualizando perfil';
   }

   getSubtitle() {
      return 'Ya casi estamos listos';
   }
}
