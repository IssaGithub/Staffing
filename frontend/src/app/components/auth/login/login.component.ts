import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = {
    email: '',
    password: '',
  };
  rememberMe = false;
  showPassword = false;
  status: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  constructor(private http: HttpClient, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.form.email || !this.form.password) return;
    this.status = 'loading';
    this.http
      .post<{ token: string }>(
        'http://localhost:3000/api/auth/login',
        this.form
      )
      .subscribe({
        next: (res) => {
          const storage = this.rememberMe ? localStorage : sessionStorage;
          storage.setItem('token', res.token);
          this.status = 'success';
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.status = 'error';
        },
      });
  }
}
