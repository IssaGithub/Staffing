import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { AuthService } from '../components/auth/auth.service';
import { computed, inject } from '@angular/core';
import { ErrorHandlingService } from '../components/utils-services/error-handling.service';
import { NavigateService } from '../components/utils-services/navigate.service';

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
    (
      store,
      authService = inject(AuthService),
      errorService = inject(ErrorHandlingService),
      navigateService = inject(NavigateService)
    ) => ({
      async createUser(email: string, password: string) {
        patchState(store, { loading: true });
        try {
          const response = await authService.signUp(email, password);
          console.log('response', response);
          patchState(store, { loading: false, error: null });
          if (response.status === 201) {
            navigateService.navigateTo('');
          } else {
            console.error('Error creating user:', response.statusText);
          }
        } catch (error) {
          const errorMessage = errorService.getErrorMessage(error);
          patchState(store, {
            loading: false,
            error: errorMessage,
          });
        }
      },

      async login(email: string, password: string) {
        patchState(store, { loading: true });
        try {
          const token = await authService.login(email, password);
          const decodedToken = jwtDecode(
            token.body?.accessToken || ''
          ) as JwtPayload;
          this.checkExpirationDurationAndSetTimer(decodedToken);
          patchState(store, {
            token: token.body?.accessToken,
            loading: false,
            error: null,
          });
          localStorage.setItem('token', token.body?.accessToken || '');
          navigateService.navigateTo('');
          console.log('response', token);
        } catch (error) {
          const errorMessage = errorService.getErrorMessage(error);
          patchState(store, {
            loading: false,
            error: errorMessage,
          });
        }
      },

      logout() {
        console.log('logout');
        const timer = store.tokenExpirationTimer;
        if (typeof timer === 'number') {
          clearTimeout(timer);
        }
        localStorage.removeItem('token');
        patchState(store, {
          token: undefined,
          loading: false,
          error: null,
          tokenExpirationTimer: null,
        });
        navigateService.navigateTo('');
      },

      loadTokenFromLocalStorage(): boolean {
        const token = authService.checkIfTokenIsValid();
        console.log('token', token);
        if (token) {
          this.checkExpirationDurationAndSetTimer(jwtDecode(token.token));
          patchState(store, { token: token.token });
          return true;
        } else {
          return false;
        }
      },

      checkExpirationDurationAndSetTimer(decodedToken: JwtPayload) {
        const expirationDuration = decodedToken.exp
          ? decodedToken.exp * 1000 - Date.now()
          : null;

        if (expirationDuration) {
          if (expirationDuration) {
            const hours = Math.floor(expirationDuration / (1000 * 60 * 60));
            const minutes = Math.floor(
              (expirationDuration % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor(
              (expirationDuration % (1000 * 60)) / 1000
            );
            console.log(
              'expirationDuration',
              hours,
              'hours',
              minutes,
              'minutes',
              seconds,
              'seconds'
            );
          }
          patchState(store, {
            tokenExpirationTimer: setTimeout(() => {
              this.logout();
            }, expirationDuration),
          });
        }
      },
    })
  ),
  withComputed((store) => ({
    isAuthenticated: computed(() => !!store.token()),
    errorMessage: computed(() => store.error()),
    loadingState: computed(() => store.loading()),
  }))
);
