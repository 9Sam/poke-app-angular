import { Component } from '@angular/core';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { ProfileComponent } from '../../profile/profile/profile.component';

@Component({
   selector: 'app-template',
   standalone: true,
   templateUrl: './template.component.html',
   styleUrl: './template.component.scss',
   imports: [NavbarComponent, ProfileComponent],
})
export class TemplateComponent {}
