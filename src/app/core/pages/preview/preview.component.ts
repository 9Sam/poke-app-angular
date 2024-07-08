import { Component } from '@angular/core';
import { LoadingIndicatorComponent } from '@shared/components/loading-indicator/loading-indicator.component';
import { ProfileImageComponent } from '@profile/components/profile-image/profile-image.component';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
   selector: 'app-preview',
   standalone: true,
   templateUrl: './preview.component.html',
   styleUrl: './preview.component.scss',
   imports: [LoadingIndicatorComponent, ProfileImageComponent, HeaderComponent],
})
export class PreviewComponent {
   getTitle() {
      return 'Previsualizando perfil';
   }

   getSubtitle() {
      return 'Ya casi estamos listos';
   }
}
