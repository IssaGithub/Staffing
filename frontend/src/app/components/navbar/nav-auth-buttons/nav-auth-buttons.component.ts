import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../../../store/user/user.actions';
import { AppState } from '../../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-auth-buttons',
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-auth-buttons.component.html',
  styleUrl: './nav-auth-buttons.component.css',
})
export class NavAuthButtonsComponent {
  display = input<'desktop' | 'mobile'>('desktop');
  
  isAuthenticated$!: Observable<boolean>;
  
  constructor(private store: Store<AppState>) {
    this.isAuthenticated$ = this.store.select(state => state.user.isAuthenticated);
  }
  
  onLogout(): void {
    this.store.dispatch(logout());
  }
}
