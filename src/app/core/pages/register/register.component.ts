import { Component, inject } from '@angular/core';
import { ProfileImageComponent } from '../../../profile/components/profile-image/profile-image.component';
import { InformationFormComponent } from '../../../profile/components/information-form/information-form.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { LoadingIndicatorComponent } from '@shared/components/loading-indicator/loading-indicator.component';
import { Router } from '@angular/router';
import { UserService } from '@shared/services/user/user.service';
import { UserI } from '../../../shared/services/user/interfaces/user.interface';

@Component({
   selector: 'app-register',
   standalone: true,
   imports: [
      HeaderComponent,
      ProfileImageComponent,
      InformationFormComponent,
      LoadingIndicatorComponent,
   ],
   templateUrl: './register.component.html',
   styleUrl: './register.component.scss',
})
export class RegisterComponent {
   userService = inject(UserService);
   router = inject(Router);

   imageUrl: string | ArrayBuffer | null = null;

   onImageSelected(imageUrl: string | ArrayBuffer | null) {
      this.imageUrl = imageUrl;
   }

   onCreateUserEvent(user: UserI) {
      user.profilePicture = this.imageUrl ? this.imageUrl.toString() : '';

      this.userService.createUser(user).subscribe((user) => {
         localStorage.setItem('user', JSON.stringify(user));
      });

      this.router.navigate(['/pokemons'], { state: { user } });
   }

   getTitle() {
      return 'Hola! Configuremos tu perfil';
   }

   getSubtitle() {
      return 'Queremos conocerte mejor.';
   }
}
