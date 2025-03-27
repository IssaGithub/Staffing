import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HeroComponent } from './pages/hero.component';
import { NavbarComponent } from './components/navbar.component';

@Component({
  imports: [NxWelcomeComponent, RouterModule, HeroComponent, NavbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
