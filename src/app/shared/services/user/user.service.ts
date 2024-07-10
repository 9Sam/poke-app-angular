import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { UserI } from './interfaces/user.interface';
import { HobbyService } from '../hobby/hobby.service';

@Injectable({
   providedIn: 'root',
})
export class UserService {
   hobbyService = inject(HobbyService);

   currentUser = new BehaviorSubject<UserI | undefined>(undefined);

   constructor() {
      this.getUser().subscribe((user) => {
         if (user && user.isLoggedIn) {
            this.currentUser.next(user);
         } else {
            this.currentUser.next(undefined);
         }
      });
   }

   getUser(): Observable<UserI | null> {
      const userLocal = localStorage.getItem('user');

      if (userLocal) {
         return of(JSON.parse(userLocal) as UserI);
      }

      return of(null);
   }

   getCurrentUser(): Observable<UserI | undefined> {
      return this.currentUser.asObservable();
   }

   createUser(user: UserI): Observable<UserI> {
      localStorage.setItem('user', JSON.stringify(user));

      this.currentUser.next(user as UserI);

      return of(user);
   }

   createCurrentUser(user: UserI): Observable<UserI | undefined> {
      this.currentUser.next(user);

      return of(user);
   }

   updateUser(user: UserI): Observable<UserI | undefined> {
      localStorage.setItem('user', JSON.stringify(user));

      return of(user);
   }

   updateCurrentUser(user: UserI): Observable<UserI | undefined> {
      this.currentUser.next(user);
      return of(user);
   }

   resetUser(): void {
      localStorage.removeItem('user');
      this.currentUser.next(undefined);
   }
}
