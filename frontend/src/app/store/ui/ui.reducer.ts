import { createReducer, on } from '@ngrx/store';
import * as UIActions from './ui.actions';

export interface UIState {
  mobileMenuOpen: boolean;
  navLinks: UIActions.NavLink[];
}

export const initialUIState: UIState = {
  mobileMenuOpen: false,
  navLinks: [
    { text: 'Produkte', url: '#' },
    { text: 'Lösungen', url: '#' },
    { text: 'Community', url: '#' },
    { text: 'Ressourcen', url: '#' },
    { text: 'Preise', url: '#' },
    { text: 'Kontakt', url: '#' },
  ]
};

export const uiReducer = createReducer(
  initialUIState,
  
  on(UIActions.openMobileMenu, (state) => ({
    ...state,
    mobileMenuOpen: true
  })),
  
  on(UIActions.closeMobileMenu, (state) => ({
    ...state,
    mobileMenuOpen: false
  })),
  
  on(UIActions.toggleMobileMenu, (state) => ({
    ...state,
    mobileMenuOpen: !state.mobileMenuOpen
  })),
  
  on(UIActions.loadNavLinks, (state, { links }) => ({
    ...state,
    navLinks: links
  }))
);