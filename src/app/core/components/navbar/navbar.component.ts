import {
   Component,
   ElementRef,
   inject,
   OnInit,
   signal,
   ViewChild,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '@shared/services/user/user.service';
import { UserI } from '@shared/services/user/interfaces/user.interface';

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
export class NavbarComponent implements OnInit {
   @ViewChild('searchInputElem') searchInputElem!: ElementRef;

   userService = inject(UserService);

   user: UserI | undefined;

   searchInput = '';
   isSearching = signal(false);

   ngOnInit(): void {
      this.userService.getCurrentUser().subscribe((user) => {
         if (user && user.isLoggedIn) {
            this.user = user;
         } else {
            this.user = undefined;
         }
      });
   }

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
