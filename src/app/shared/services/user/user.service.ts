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

   getCurrentUser(): Observable<SystemUserI | undefined> {
      return this.currentUser.asObservable();
   }

   createUser(user: UserI): Observable<UserI> {
      const users = this.usersSubject.getValue();
      users.push(user);
      this.usersSubject.next(users);

      this.hobbyService.createHobby(user.favoriteHobby).subscribe();

   createCurrentUser(user: SystemUserI): Observable<UserI | undefined> {
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

   updateCurrentUser(user: SystemUserI): Observable<SystemUserI | undefined> {
      this.currentUser.next(user);
         return of(user);
      } else {
         return of(undefined);
      }
   }
}
