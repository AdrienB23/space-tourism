import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {provideRouter} from '@angular/router';
import {routes} from './core/app-routing/app-routing.module';
import {provideAnimations} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
