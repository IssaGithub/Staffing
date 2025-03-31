import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Authstore } from '../store/auth.store';

export const authGuard: CanActivateFn = () =>
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  {
    const authStore = inject(Authstore);
    const isAuthenticated = authStore.loadTokenFromLocalStorage();
    if (!isAuthenticated) {
      return false;
    }

    return true;
  };
