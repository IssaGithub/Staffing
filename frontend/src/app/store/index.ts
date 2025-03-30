import { ActionReducerMap } from '@ngrx/store';

import { UserState, userReducer } from './user';
import { UIState, uiReducer } from './ui';

export interface AppState {
  user: UserState;
  ui: UIState;
}

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  ui: uiReducer,
};

export * from './user';
export * from './ui';

import { UserEffects } from './user';
export const effects = [
  UserEffects,
];