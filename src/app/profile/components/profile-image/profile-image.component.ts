import { Component, output } from '@angular/core';

@Component({
   selector: 'app-profile-image',
   standalone: true,
   imports: [],
   templateUrl: './profile-image.component.html',
   styleUrl: './profile-image.component.scss',
})
export class ProfileImageComponent {
   selectedFile: File | null = null;
   imageUrl: string | ArrayBuffer | null = null;
   imageSelectedEvent = output<string | ArrayBuffer | null>();

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
}
