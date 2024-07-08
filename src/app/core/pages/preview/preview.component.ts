import { Component, inject, signal } from '@angular/core';
import { LoadingIndicatorComponent } from '@shared/components/loading-indicator/loading-indicator.component';
import { ProfileImageComponent } from '@profile/components/profile-image/profile-image.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { UserService } from '@shared/services/user/user.service';
import { UserI } from '@shared/services/user/interfaces/user.interface';
import { PreviewPokemonsComponent } from '../../../profile/components/preview-pokemons/preview-pokemons.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
   selector: 'app-preview',
   standalone: true,
   templateUrl: './preview.component.html',
   styleUrl: './preview.component.scss',
   imports: [
      LoadingIndicatorComponent,
      ProfileImageComponent,
      HeaderComponent,
      PreviewPokemonsComponent,
      MatButtonModule,
      MatDividerModule,
      MatIconModule,
   ],
})
export class PreviewComponent {
   userService = inject(UserService);

   user = signal<UserI | undefined>({} as UserI);

   constructor() {
      this.userService.getCurrentUser().subscribe((user) => {
         this.user.set(user);
      });
   }

   getTitle() {
      return this.user()
         ? '¡Hola ' + this.user()?.name + '!'
         : 'Previsualizando perfil';
   }

   getSubtitle() {
      return 'Ya casi estamos listos';
   }
}
