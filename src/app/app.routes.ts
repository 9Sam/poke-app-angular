import { Routes } from '@angular/router';

export const routes: Routes = [
   {
      path: '',
      loadComponent: () =>
         import('./core/pages/register/register.component').then(
            (m) => m.RegisterComponent,
         ),
   },
   {
      path: 'edit',
      loadComponent: () =>
         import('./core/pages/edit-profile/edit-profile.component').then(
            (m) => m.EditProfileComponent,
         ),
   },
   {
      path: 'pokemons',
      loadComponent: () =>
         import('./core/pages/choose-pokemons/choose-pokemons.component').then(
            (m) => m.ChoosePokemonsComponent,
         ),
   },
   {
      path: 'pokemons/edit',
      loadComponent: () =>
         import('./core/pages/edit-pokemons/edit-pokemons.component').then(
            (m) => m.EditPokemonsComponent,
         ),
   },
   {
      path: 'preview',
      loadComponent: () =>
         import('./core/pages/preview/preview.component').then(
            (m) => m.PreviewComponent,
         ),
   },
   {
      path: '**',
      redirectTo: '',
   },
];
