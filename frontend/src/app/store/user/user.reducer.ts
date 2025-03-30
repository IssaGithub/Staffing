import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export interface UserState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: any | null;
}

export const initialUserState: UserState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

export const userReducer = createReducer(
  initialUserState,
  
  on(UserActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(UserActions.loginSuccess, (state, { token }) => ({
    ...state,
    token,
    isAuthenticated: true,
    isLoading: false,
    error: null
  })),
  
  on(UserActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  on(UserActions.register, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(UserActions.registerSuccess, (state) => ({
    ...state,
    isLoading: false,
    error: null
  })),
  
  on(UserActions.registerFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  on(UserActions.logout, () => ({
    ...initialUserState
  }))
);