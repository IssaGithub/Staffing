import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../components/auth/auth.service';

import { 
  login, loginSuccess, loginFailure,
  register, registerSuccess, registerFailure,
  logout
} from './user.actions';

@Injectable()
export class UserEffects {
  login$;
  loginSuccess$;
  register$;
  registerSuccess$;
  logout$;

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {
    this.login$ = createEffect(() => 
      this.actions$.pipe(
        ofType(login),
        switchMap((action) => 
          this.authService.login(action.email, action.password).pipe(
            map(response => {
              localStorage.setItem('token', response.token);
              return loginSuccess({ token: response.token });
            }),
            catchError(error => of(loginFailure({ error })))
          )
        )
      )
    );

    this.loginSuccess$ = createEffect(() => 
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => this.router.navigate(['/dashboard']))
      ),
      { dispatch: false }
    );

    this.register$ = createEffect(() => 
      this.actions$.pipe(
        ofType(register),
        switchMap((action) => 
          this.authService.register(action.email, action.password).pipe(
            map(() => registerSuccess()),
            catchError(error => of(registerFailure({ error })))
          )
        )
      )
    );

    this.registerSuccess$ = createEffect(() => 
      this.actions$.pipe(
        ofType(registerSuccess),
        tap(() => this.router.navigate(['/login']))
      ),
      { dispatch: false }
    );

    this.logout$ = createEffect(() => 
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.authService.logout();
          this.router.navigate(['/login']);
        })
      ),
      { dispatch: false }
    );
  }
}