import {
  ApplicationConfig,
  provideZoneChangeDetection,
  provideAppInitializer,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { Authstore } from './store/auth.store';

function initializeApp() {
  const authStore = inject(Authstore);
  console.log('Initializing app and loading token');
  return Promise.resolve(authStore.loadTokenFromLocalStorage());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    // provideHttpClientWithInterceptors([
    //   // Add any interceptors here if needed
    // ]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAppInitializer(initializeApp),
  ],
};
