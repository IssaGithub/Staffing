import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  showPassword = false;
  status: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  constructor(private http: HttpClient, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (
      !this.form.email ||
      !this.form.password ||
      this.form.password !== this.form.confirmPassword
    ) {
      this.status = 'error';
      return;
    }

    this.status = 'loading';

    this.http
      .post('http://localhost:3000/api/auth/register', this.form)
      .subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/login']);
        },
        error: () => {
          this.status = 'error';
        },
      });
  }
}
