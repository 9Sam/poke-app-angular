import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { SystemUserI, UserI } from './interfaces/user.interface';
import { HobbyService } from '../hobby/hobby.service';

@Injectable({
   providedIn: 'root',
})
export class UserService {
   hobbyService = inject(HobbyService);

   currentUser = new BehaviorSubject<SystemUserI | undefined>(undefined);

   getUser(): Observable<UserI | null> {
      const userLocal = localStorage.getItem('user');

      if (userLocal) {
         return of(JSON.parse(userLocal) as UserI);
      }

      return of(null);
   }

   getCurrentUser(): Observable<SystemUserI | undefined> {
      return this.currentUser.asObservable();
   }

   createUser(user: UserI): Observable<UserI> {
      localStorage.setItem('user', JSON.stringify(user));

      return of(user);
   }

   createCurrentUser(user: SystemUserI): Observable<UserI | undefined> {
      this.currentUser.next(user);

      return of(user);
   }

   updateUser(user: UserI): Observable<UserI | undefined> {
      localStorage.setItem('user', JSON.stringify(user));
      return of(user);
   }

   updateCurrentUser(user: SystemUserI): Observable<SystemUserI | undefined> {
      this.currentUser.next(user);
      return of(user);
   }

   resetUser(): void {
      localStorage.removeItem('user');
      this.currentUser.next(undefined);
   }
}
