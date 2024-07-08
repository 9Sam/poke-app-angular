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

   private usersSubject = new BehaviorSubject<UserI[]>([]);

   getUsers(): Observable<UserI[]> {
      return this.usersSubject.asObservable();
   }

   getUserData(userId: string): Observable<UserI | undefined> {
      const user = this.usersSubject
         .getValue()
         .find((user) => user.id === userId);
      return of(user);
   }

   getCurrentUser(): Observable<UserI | undefined> {
      return this.currentUser.asObservable();
   }

   getUserFromLocalStorage(): Observable<UserI | string | null> {
      return of(localStorage.getItem('user'));
   }

   createUser(user: UserI): Observable<UserI> {
      const users = this.usersSubject.getValue();
      users.push(user);
      this.usersSubject.next(users);

      this.hobbyService.createHobby(user.favoriteHobby).subscribe();

      this.currentUser.next(user);

      return of(user);
   }

   updateUser(user: UserI): Observable<UserI | undefined> {
      const users = this.usersSubject.getValue();
      const userIndex = users.findIndex((u) => u.id === user.id);

      if (userIndex !== -1) {
         users[userIndex] = user;
         this.usersSubject.next(users);
         return of(user);
      } else {
         return of(undefined);
      }
   }
}
