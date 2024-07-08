import {
   Component,
   ElementRef,
   inject,
   input,
   OnInit,
   output,
   signal,
   Signal,
   ViewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
   FormControl,
   FormGroup,
   ReactiveFormsModule,
   Validators,
} from '@angular/forms';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {
   MatAutocompleteModule,
   MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatButtonModule } from '@angular/material/button';
import { isMoreThan18YearsOld } from './validations';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { UserI } from '@shared/services/user/interfaces/user.interface';
import { UserService } from '@shared/services/user/user.service';
import { HobbyService } from '../../../shared/services/hobby/hobby.service';
import { LoadingService } from '../../../shared/services/loading/loading.service';

@Component({
   selector: 'app-information-form',
   standalone: true,
   imports: [
      MatFormFieldModule,
      MatInputModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatAutocompleteModule,
      MatChipsModule,
      MatIconModule,
      ReactiveFormsModule,
      MatButtonModule,
      AsyncPipe,
      NgxMaskDirective,
      NgxMaskPipe,
   ],
   providers: [provideNgxMask()],
   templateUrl: './information-form.component.html',
   styleUrl: './information-form.component.scss',
})
export class InformationFormComponent implements OnInit {
   userService = inject(UserService);
   hobbyService = inject(HobbyService);
   announcer = inject(LiveAnnouncer);
   loadingService = inject(LoadingService);

   editing = input<boolean>(false);

   loadingSub = this.loadingService.loadingSubject;
   createUserEvent = output<UserI>({});

   user: Signal<UserI | undefined> = signal(undefined);
   hobbies: string[] = [];
   allHobbies: string[] = [];

   @ViewChild('hobbyInput') hobbyInput!: ElementRef<HTMLInputElement>;
   @ViewChild('clickable') clickable!: ElementRef<HTMLElement>;

   profileForm: FormGroup = {} as FormGroup;

   separatorKeysCodes: number[] = [ENTER, COMMA];
   filteredHobbies$!: Observable<string[]>;

   isButtonDisabled = signal(false);
   isInputAvailable = signal(true);
   isDui = signal(true);
   is18OrOver = signal(false);

   constructor() {
      this.profileForm = new FormGroup({
         name: new FormControl('', Validators.required),
         favoriteHobby: new FormControl({ value: '', disabled: false }),
         birthday: new FormControl('', Validators.required),
         document: new FormControl(''),
         dui: new FormControl(''),
      });

      this.filteredHobbies$ = this.profileForm.controls[
         'favoriteHobby'
      ].valueChanges.pipe(
         startWith(null),
         map((hobby: string | null) => {
            return hobby ? this._filter(hobby) : this.allHobbies.slice();
         }),
      );

      this.profileForm.controls['birthday'].valueChanges.subscribe((value) => {
         const is18OrOver = isMoreThan18YearsOld(value);
         this.is18OrOver.set(is18OrOver);

         if (is18OrOver) {
            this.profileForm.controls['document'].clearValidators();
            this.profileForm.controls['dui'].setValidators([
               Validators.required,
            ]);
         } else {
            this.profileForm.controls['document'].setValidators([
               Validators.required,
            ]);

            this.profileForm.controls['dui'].removeValidators([
               Validators.required,
            ]);
         }

         this.profileForm.controls['dui'].updateValueAndValidity();
         this.profileForm.controls['document'].updateValueAndValidity();
      });
   }

   ngOnInit(): void {
      this.hobbyService.getHobbies().subscribe((hobbies) => {
         this.allHobbies = hobbies;
      });

      if (this.editing()) {
         this.userService.getCurrentUser().subscribe((user) => {
            if (user) {
               this.profileForm.patchValue({
                  name: user.name,
                  favoriteHobby: user.favoriteHobby,
                  birthday: user.birthday,
                  document: user.document,
                  dui: user.dui,
               });
            }
         });
      }
   }

   submit(): void {
      this.loadingService.loadingSubject.next(true);

      const user = {
         name: this.profileForm.value.name,
         favoriteHobby: this.hobbies[0] ?? '',
         birthday: this.profileForm.value.birthday,
         document: this.profileForm.value.document,
         profilePicture: '',
         dui: this.profileForm.value.dui ?? '',
      } as UserI;

      this.createUserEvent.emit(user);
   }

   add(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();

      if (value) {
         this.hobbies.push(value);
         this.hobbyInput.nativeElement.style.display = 'none';

         setTimeout(() => {
            this.clickable.nativeElement.click();
         }, 10);
      }

      event.chipInput!.clear();

      this.profileForm.controls['favoriteHobby'].setValue(null);
   }

   remove(hobby: string): void {
      const index = this.hobbies.indexOf(hobby);

      if (index >= 0) {
         this.hobbies.splice(index, 1);

         this.announcer.announce(`Removed ${hobby}`);
      }

      if (this.hobbies.length === 0) {
         this.hobbyInput.nativeElement.style.display = 'block';
      }
   }

   selected(event: MatAutocompleteSelectedEvent): void {
      if (this.hobbies.length === 0) {
         this.hobbies.push(event.option.viewValue);
         this.hobbyInput.nativeElement.style.display = 'none';
      }

      this.hobbyInput.nativeElement.value = '';
      this.profileForm.controls['favoriteHobby'].setValue(null);
   }

   private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.allHobbies.filter((hobby) =>
         hobby.toLowerCase().includes(filterValue),
      );
   }
}
