import { Route } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';

import { LandingpageComponent } from './components/main/landingpage.component';
import { RegisterComponent } from './components/auth/register/register.component';
// import { authGuard } from './guards/auth.guard'; Istimplementiert, wird aber derzeit noch nicht benötigt

export const appRoutes: Route[] = [
  { path: '', component: LandingpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
