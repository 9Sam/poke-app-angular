import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplateComponent } from './template/template/template.component';

@Component({
   selector: 'app-root',
   standalone: true,
   templateUrl: './app.component.html',
   styleUrl: './app.component.scss',
   imports: [RouterOutlet, TemplateComponent],
})
export class AppComponent {
   title = 'poke-app-angular';
}
