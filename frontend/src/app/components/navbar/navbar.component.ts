import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavAuthButtonsComponent } from './nav-auth-buttons/nav-auth-buttons.component';
import { NavLinksComponent } from './nav-links/nav-links.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { toggleMobileMenu } from '../../store/ui/ui.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterModule,
    NavAuthButtonsComponent,
    NavLinksComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  mobileMenuOpen$: Observable<boolean>;
  
  constructor(private store: Store<AppState>) {
    this.mobileMenuOpen$ = this.store.select(state => state.ui.mobileMenuOpen);
  }

  toggleMenu() {
    this.store.dispatch(toggleMobileMenu());
  }
}
