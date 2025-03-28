import { Route } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';

import { LandingpageComponent } from './components/main/landingpage.component';

// path '' ist noch nicht erarbeitet und daher auskommentiert.
export const appRoutes: Route[] = [
  { path: '', component: LandingpageComponent },
  { path: 'login', component: LoginComponent },
];
