import { Component, inject } from '@angular/core';
import { InformationFormComponent } from '@profile/components/information-form/information-form.component';
import { ProfileImageComponent } from '@profile/components/profile-image/profile-image.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { PickPokemonsComponent } from '@profile/components/pick-pokemons/pick-pokemons.component';
import { LoadingIndicatorComponent } from '@shared/components/loading-indicator/loading-indicator.component';
import { Router } from '@angular/router';
import { UserService } from '@shared/services/user/user.service';
import {
   SystemUserI,
   UserI,
} from '@shared/services/user/interfaces/user.interface';

@Component({
   selector: 'app-edit-pokemons',
   standalone: true,
   templateUrl: './edit-pokemons.component.html',
   styleUrl: './edit-pokemons.component.scss',
   imports: [
      HeaderComponent,
      ProfileImageComponent,
      InformationFormComponent,
      PickPokemonsComponent,
      LoadingIndicatorComponent,
   ],
})
export class EditPokemonsComponent {
   router = inject(Router);
   userService = inject(UserService);

   currentUser: UserI = {} as UserI;

   constructor() {
      this.userService.getUser().subscribe((user) => {
         if (user) {
            this.currentUser = user;
         } else {
            this.router.navigate(['/']);
         }
      });
   }

   onPokemonsSelected(pokemons: Set<number>) {
      if (this.currentUser) {
         this.currentUser.pokemons = [...pokemons];

         this.userService.updateUser(this.currentUser).subscribe(() => {
            const tempUser: SystemUserI = {
               ...this.currentUser,
            } as SystemUserI;

            tempUser.isLoggedIn = true;

            this.userService.updateCurrentUser(tempUser);
         });
      }

      this.router.navigate(['/preview']);
   }

   getTitle() {
      return '¡Ya casi terminamos!';
   }

   getSubtitle() {
      return 'Revisa la información y completa lo solicitado.';
   }
}
