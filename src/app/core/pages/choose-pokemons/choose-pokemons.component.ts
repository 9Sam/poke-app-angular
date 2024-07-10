import { Component, inject } from '@angular/core';
import { InformationFormComponent } from '@profile/components/information-form/information-form.component';
import { ProfileImageComponent } from '@profile/components/profile-image/profile-image.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { PickPokemonsComponent } from '@profile/components/pick-pokemons/pick-pokemons.component';
import { LoadingIndicatorComponent } from '@shared/components/loading-indicator/loading-indicator.component';
import { Router } from '@angular/router';
import { UserService } from '@shared/services/user/user.service';
import { SystemUserI } from '@shared/services/user/interfaces/user.interface';

@Component({
   selector: 'app-choose-pokemons',
   standalone: true,
   templateUrl: './choose-pokemons.component.html',
   styleUrl: './choose-pokemons.component.scss',
   imports: [
      HeaderComponent,
      ProfileImageComponent,
      InformationFormComponent,
      PickPokemonsComponent,
      LoadingIndicatorComponent,
   ],
})
export class ChoosePokemonsComponent {
   router = inject(Router);
   userService = inject(UserService);

   currentUser: SystemUserI = {} as SystemUserI;

   constructor() {
      this.userService.getCurrentUser().subscribe((user) => {
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

         this.userService.createUser(this.currentUser).subscribe(() => {
            const user = { ...this.currentUser };

            user.isLoggedIn = true;

            this.userService.updateCurrentUser(user);
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
