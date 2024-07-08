import { Component } from '@angular/core';
import { InformationFormComponent } from '../../../profile/components/information-form/information-form.component';
import { ProfileImageComponent } from '../../../profile/components/profile-image/profile-image.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { LoadingIndicatorComponent } from '@shared/components/loading-indicator/loading-indicator.component';

@Component({
   selector: 'app-edit-profile',
   standalone: true,
   imports: [
      HeaderComponent,
      ProfileImageComponent,
      InformationFormComponent,
      LoadingIndicatorComponent,
   ],
   templateUrl: './edit-profile.component.html',
   styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
   onImageSelected(imageUrl: string | ArrayBuffer | null) {
      console.log('imageUrl', imageUrl);
   }

   onCreateUserEvent(user: any) {
      console.log('user', user);
   }

   getTitle() {
      return 'Editando perfil';
   }

   getSubtitle() {
      return 'Edita los datos que desees cambiar.';
   }
}
