import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
   selector: 'app-navbar',
   standalone: true,
   imports: [
      MatToolbarModule,
      MatButtonModule,
      MatSelectModule,
      MatIconModule,
      MatInputModule,
      MatMenuModule,
      ReactiveFormsModule,
      FormsModule,
   ],
   templateUrl: './navbar.component.html',
   styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
   @ViewChild('searchInputElem') searchInputElem!: ElementRef;

   searchInput = '';
   isSearching = signal(false);

   menuItems = [
      {
         label: 'user',
         value: 'José',
      },
   ];

   handleSearchClick() {
      this.isSearching.set(true);
      setTimeout(() => this.searchInputElem.nativeElement.focus(), 0);
   }

   handleSearchClose() {
      this.isSearching.set(false);
      this.searchInput = '';
   }

   handleBlur() {
      if (this.searchInput.length === 0) {
         this.isSearching.set(false);
      }
   }
}
