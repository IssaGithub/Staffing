import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { NavLink } from '../../../store/ui/ui.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-links',
  imports: [CommonModule],
  templateUrl: './nav-links.component.html',
  styleUrl: './nav-links.component.css',
})
export class NavLinksComponent {
  display = input<'desktop' | 'mobile'>('desktop');
  
  links$: Observable<NavLink[]>;
  
  constructor(private store: Store<AppState>) {
    this.links$ = this.store.select(state => state.ui.navLinks);
  }
}
