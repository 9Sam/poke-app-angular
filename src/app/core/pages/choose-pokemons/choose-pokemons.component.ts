import { Component, inject } from '@angular/core';
import { InformationFormComponent } from '../../../profile/components/information-form/information-form.component';
import { ProfileImageComponent } from '../../../profile/components/profile-image/profile-image.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { PickPokemonsComponent } from '../../../profile/components/pick-pokemons/pick-pokemons.component';
import { LoadingIndicatorComponent } from '@shared/components/loading-indicator/loading-indicator.component';
import { Router } from '@angular/router';

@Component({
   selector: 'app-choose-pokemons',
   standalone: true,
   templateUrl: './choose-pokemons.component.html',
   styleUrl: './choose-pokemons.component.scss',
   imports: [
      HeaderComponent,
      ProfileImageComponent,
      InformationFormComponent,
      PickPokemonsComponent,
      LoadingIndicatorComponent,
   ],
})
export class ChoosePokemonsComponent {
   router = inject(Router);

   onPokemonsSelected(pokemons: Set<number>) {
      this.router.navigate(['/preview'], { state: { pokemons } });
   }

   getTitle() {
      return '¡Ya casi terminamos!';
   }

   getSubtitle() {
      return 'Revisa la información y completa lo solicitado.';
   }
}
