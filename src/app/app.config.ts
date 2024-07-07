import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
   providers: [
      provideRouter(routes),
      provideNativeDateAdapter(),
      provideAnimationsAsync(),
      {
         provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
         useValue: { appearance: 'outline', subscriptSizing: 'dynamic' },
      },
   ],
};
