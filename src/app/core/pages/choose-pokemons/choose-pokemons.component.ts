import { Component } from '@angular/core';
import { InformationFormComponent } from '../../../profile/components/information-form/information-form.component';
import { ProfileImageComponent } from '../../../profile/components/profile-image/profile-image.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { PickPokemonsComponent } from '../../../profile/components/pick-pokemons/pick-pokemons.component';
import { LoadingIndicatorComponent } from '@shared/components/loading-indicator/loading-indicator.component';

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
   onPokemonsSelected(pokemons: Set<number>) {
      console.log('selectedpokemons', pokemons);
   }

   getTitle() {
      return 'Seleccionando pokemons';
   }

   getSubtitle() {
      return 'Selecciona los pokemons que te gusten.';
   }
}
