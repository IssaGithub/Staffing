import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginURL = environment.apiUrl + '/auth/login';
  registerURL = environment.apiUrl + '/auth/register';
}
