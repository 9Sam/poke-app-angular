import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
   selector: 'app-progress-bar',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './progress-bar.component.html',
   styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {
   progress = input<number>(0);

   getPercentage() {
      return `${this.progress()}%`;
   }
}
