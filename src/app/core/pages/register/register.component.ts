import { Component } from '@angular/core';
import { ProfileImageComponent } from '../../../profile/components/profile-image/profile-image.component';
import { InformationFormComponent } from '../../../profile/components/information-form/information-form.component';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
   selector: 'app-register',
   standalone: true,
   imports: [HeaderComponent, ProfileImageComponent, InformationFormComponent],
   templateUrl: './register.component.html',
   styleUrl: './register.component.scss',
})
export class RegisterComponent {
   onImageSelected(imageUrl: string | ArrayBuffer | null) {
      console.log('imageUrl', imageUrl);
   }

   onCreateUserEvent(user: any) {
      console.log('user', user);
   }

   getTitle() {
      return 'Hola! Configuremos tu perfil';
   }

   getSubtitle() {
      return 'Queremos conocerte mejor.';
   }
}
