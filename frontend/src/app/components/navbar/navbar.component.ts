import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavAuthButtonsComponent } from './nav-auth-buttons/nav-auth-buttons.component';
import { NavLinksComponent } from './nav-links/nav-links.component';

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
  mobileMenuOpen = false;

  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
