import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginURL = environment.apiUrl + '/auth/login';
  registerURL = environment.apiUrl + '/auth/register';

  http = inject(HttpClient);

  signUp(email: string, password: string) {
    const createAuthDto = {
      email: email,
      password: password,
    };
    return new Promise<HttpResponse<any>>((resolve, reject) => {
      this.http
        .post<HttpResponse<any>>(this.registerURL, createAuthDto, {
          observe: 'response',
        })
        .subscribe({
          next: (response) => {
            resolve(response);
          },
          error: (error) => {
            reject(error);
          },
          complete: () => {
            console.log('Request completed');
          },
        });
    });
  }
}
