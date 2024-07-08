import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingIndicatorComponent } from './shared/components/loading-indicator/loading-indicator.component';
// import { LoadingService } from './shared/services/loading/loading.service';
import { NavbarComponent } from './core/components/navbar/navbar.component';

@Component({
   selector: 'app-root',
   standalone: true,
   templateUrl: './app.component.html',
   styleUrl: './app.component.scss',
   imports: [RouterOutlet, LoadingIndicatorComponent, NavbarComponent],
})
export class AppComponent {
   // loadingService = new LoadingService();

   // loadingSub = this.loadingService.loadingSubject;

   title = 'poke-app-angular';
}
