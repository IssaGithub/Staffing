import { Route } from '@angular/router';
import { HeroComponent } from './pages/hero.component';
import { LoginComponent } from './pages/login/login.component';

export const appRoutes: Route[] = [
  { path: '', component: HeroComponent },
  { path: 'login', component: LoginComponent },
];
