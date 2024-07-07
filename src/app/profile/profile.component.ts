import { Component, signal } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { ProfileImageComponent } from './components/profile-image/profile-image.component';
import { InformationFormComponent } from './components/information-form/information-form.component';
import { LoadingIndicatorComponent } from '../shared/components/loading-indicator/loading-indicator.component';
import { UserI } from '@shared/services/user/interfaces/user.interface';

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
   ],
})
export class ProfileComponent {
   imageUrl: string | ArrayBuffer | null = null;

   isLoading = signal<boolean>(false);
   isEditing = signal<boolean | null>(null);

   onImageSelected(imageUrl: string | ArrayBuffer | null) {
      this.imageUrl = imageUrl;
   }

   onCreateUserEvent(user: UserI | undefined) {
      if (user) {
         console.log('inside profile', user);
      }
      this.isLoading.set(true);
   }
}
