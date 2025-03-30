import { provideStoreDevtools } from '@ngrx/store-devtools';

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  providers: [
    provideStoreDevtools({ 
      maxAge: 25,
      logOnly: false, 
      autoPause: true,
      trace: false,
      traceLimit: 75,
    })
  ],
};
