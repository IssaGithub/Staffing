import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginURL = environment.apiUrl + '/auth/login';
  registerURL = environment.apiUrl + '/auth/register';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.loginURL, { email, password });
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(this.registerURL, { email, password });
  }
  
  logout(): void {
    localStorage.removeItem('token');
  }
}
