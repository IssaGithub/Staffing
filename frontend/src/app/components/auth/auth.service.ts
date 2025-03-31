import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

interface AuthResponse {
  message: string;
}

interface LoginResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginURL = environment.apiUrl + '/auth/login';
  registerURL = environment.apiUrl + '/auth/signup';

  http = inject(HttpClient);

  signUp(email: string, password: string): Promise<HttpResponse<AuthResponse>> {
    const authCredentialsDTO = {
      email: email,
      password: password,
    };
    return new Promise<HttpResponse<AuthResponse>>((resolve, reject) => {
      this.http
        .post<{ message: string }>(this.registerURL, authCredentialsDTO, {
          observe: 'response',
        })
        .subscribe({
          next: (response) => {
            resolve(response);
          },
          error: (error: HttpErrorResponse) => {
            reject(error);
          },
        });
    });
  }

  async login(
    email: string,
    password: string
  ): Promise<HttpResponse<LoginResponse>> {
    const authCredentialsDTO = {
      email: email,
      password: password,
    };
    return new Promise<HttpResponse<LoginResponse>>((resolve, reject) => {
      this.http
        .post<{ accessToken: string }>(this.loginURL, authCredentialsDTO, {
          observe: 'response',
        })
        .subscribe({
          next: (response) => {
            resolve(response);
          },
          error: (error: HttpErrorResponse) => {
            reject(error);
          },
        });
    });
  }

  checkIfTokenIsValid(): { token: string } | false {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    const decodedToken = jwtDecode(token);
    const expirationDate = decodedToken.exp
      ? new Date(decodedToken.exp * 1000)
      : null;
    if (expirationDate && expirationDate <= new Date()) {
      return false;
    }

    return { token: token };
  }
}
