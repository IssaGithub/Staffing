import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { AuthService } from '../components/auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

type AuthState = {
  token: string | undefined;
  loading: boolean;
  error: string | null;
  tokenExpirationTimer: ReturnType<typeof setTimeout> | null;
};

const initialState: AuthState = {
  token: undefined,
  loading: false,
  error: null,
  tokenExpirationTimer: null,
};

export const Authstore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (store, authService = inject(AuthService), router = inject(Router)) => ({
      async createUser(email: string, password: string) {
        patchState(store, { loading: true });
        try {
          const response = await authService.signUp(email, password);
          patchState(store, { loading: false });
          if (response.status === 201) {
            console.log('User erfolgreich angelegt');
            router.navigate(['']);
          } else {
            console.error('Error creating user:', response.statusText);
          }
        } catch (error) {
          if (error instanceof Error) {
            patchState(store, { loading: false, error: error.message });
          } else {
            patchState(store, {
              loading: false,
              error: 'An unknown error occurred',
            });
          }
        }
      },
    })
  )
);
