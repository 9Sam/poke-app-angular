import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { InformationFormComponent } from '@profile/components/information-form/information-form.component';
import { ProfileImageComponent } from '@profile/components/profile-image/profile-image.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { LoadingIndicatorComponent } from '@shared/components/loading-indicator/loading-indicator.component';
import { UserService } from '@shared/services/user/user.service';
import { UserI } from '@shared/services/user/interfaces/user.interface';

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
export class EditProfileComponent implements OnInit {
   userService = inject(UserService);
   router = inject(Router);

   user = signal<UserI>({} as UserI);

   imageUrl: string | ArrayBuffer | null = null;

   ngOnInit(): void {
      this.userService.getUser().subscribe((user) => {
         if (user) {
            this.user.set(user);
         } else {
            this.router.navigate(['/']);
         }
      });
   }

   onImageSelected(imageUrl: string | ArrayBuffer | null) {
      this.imageUrl = imageUrl;
   }

   onCreateUserEvent(user: UserI) {
      user.profilePicture = this.imageUrl
         ? this.imageUrl.toString()
         : this.user().profilePicture;

      this.userService.updateUser(user).subscribe(() => {
         this.router.navigate(['/preview']);
      });
   }

   getTitle() {
      return 'Editando perfil';
   }

   getSubtitle() {
      return 'Edita los datos que desees cambiar.';
   }
}
