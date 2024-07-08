import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { ProfileImageComponent } from './components/profile-image/profile-image.component';
import { InformationFormComponent } from './components/information-form/information-form.component';
import { LoadingIndicatorComponent } from '../shared/components/loading-indicator/loading-indicator.component';
import { UserI } from '@shared/services/user/interfaces/user.interface';
import { PickPokemonsComponent } from './components/pick-pokemons/pick-pokemons.component';
import { LoadingService } from '../shared/services/loading/loading.service';

@Component({
   selector: 'app-profile',
   standalone: true,
   templateUrl: './profile.component.html',
   styleUrl: './profile.component.scss',
   imports: [
      HeaderComponent,
      ProfileImageComponent,
      InformationFormComponent,
      LoadingIndicatorComponent,
      PickPokemonsComponent,
   ],
})
export class ProfileComponent {
   loadingService = inject(LoadingService);

   loadingSub = this.loadingService.loadingSubject;

   imageUrl: string | ArrayBuffer | null = null;

   isEditing = signal<boolean | null>(true);

   onImageSelected(imageUrl: string | ArrayBuffer | null) {
      this.imageUrl = imageUrl;
   }

   onCreateUserEvent(user: UserI | undefined) {
      if (user) {
         setTimeout(() => {
            this.loadingService.loadingSubject.next(false);
         }, 2000);
      }
   }

   onPokemonsSelected(pokemons: Set<number>) {
      console.log('selectedpokemons', pokemons);
   }

   getTitle() {
      return this.isEditing()
         ? 'Editando perfil'
         : 'Hola! Configuremos tu perfil';
   }

   getSubtitle() {
      return this.isEditing()
         ? 'Edita los datos que desees cambiar.'
         : 'Queremos conocerte mejor.';
   }
}
