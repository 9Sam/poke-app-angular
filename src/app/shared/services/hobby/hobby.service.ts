import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class HobbyService {
   hobbiesSub = new BehaviorSubject<string[]>([
      'Jugar videojuegos',
      'Programar',
      'Escribir',
      'Tocar un instrumento',
   ]);

   getHobbies(): Observable<string[]> {
      return this.hobbiesSub.asObservable();
   }

   createHobby(name: string): Observable<string> {
      const hobbies = this.hobbiesSub.getValue();
      const hobbyExists = hobbies.includes(name);

      if (!hobbyExists) {
         hobbies.push(name);
         this.hobbiesSub.next(hobbies);
      }

      return of(name);
   }

   deleteHobby(name: string): Observable<string> {
      const hobbies = this.hobbiesSub.getValue();
      const index = hobbies.indexOf(name);

      if (index !== -1) {
         hobbies.splice(index, 1);
         this.hobbiesSub.next(hobbies);
      }

      return of(name);
   }
}
