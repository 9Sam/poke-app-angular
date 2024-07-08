import { Component, inject, input, output, signal } from '@angular/core';
import { UserI } from '@shared/services/user/interfaces/user.interface';
import { UserService } from '@shared/services/user/user.service';
import { differenceInYears, parseISO } from 'date-fns';

@Component({
   selector: 'app-profile-image',
   standalone: true,
   imports: [],
   templateUrl: './profile-image.component.html',
   styleUrl: './profile-image.component.scss',
})
export class ProfileImageComponent {
   userService = inject(UserService);

   selectedFile: File | null = null;
   imageUrl: string | ArrayBuffer | null = null;
   imageSelectedEvent = output<string | ArrayBuffer | null>();

   user = signal<UserI>({} as UserI);

   isPreview = input<boolean>(false);
   showBadge = input<boolean>(false);

   constructor() {
      this.userService.getCurrentUser().subscribe((user) => {
         if (user) {
            this.user.set(user);
         }
      });
   }

   onFileSelected($event: any) {
      const fileInput = $event.target as HTMLInputElement;

      if (fileInput.files && fileInput.files[0]) {
         this.selectedFile = fileInput.files[0];

         const reader = new FileReader();

         reader.onload = () => {
            this.imageUrl = reader.result;

            this.imageSelectedEvent.emit(this.imageUrl);
         };
         reader.readAsDataURL(this.selectedFile);
      }
   }

   deleteImage() {
      this.imageUrl = null;
      this.selectedFile = null;
   }

   getTitle() {
      return this.user().name ? this.user().name : 'Imagen de perfil';
   }

   getImageSrc() {
      return this.user().profilePicture
         ? this.user().profilePicture
         : 'assets/icons/user_24px.png';
   }

   getUserAge() {
      if (this.user().birthday) {
         const date = new Date(this.user().birthday);
         const parsedDate = parseISO(date.toISOString());

         return differenceInYears(new Date(), parsedDate) + ' años';
      }

      return 'Sin fecha disponible';
   }

   getImageName(): string | null {
      return this.selectedFile ? this.selectedFile.name : null;
   }
}
