import { createAction, props } from '@ngrx/store';

export const openMobileMenu = createAction('[UI] Open Mobile Menu');
export const closeMobileMenu = createAction('[UI] Close Mobile Menu');
export const toggleMobileMenu = createAction('[UI] Toggle Mobile Menu');

export interface NavLink {
  text: string;
  url: string;
}

export const loadNavLinks = createAction(
  '[UI] Load Navigation Links',
  props<{ links: NavLink[] }>()
);