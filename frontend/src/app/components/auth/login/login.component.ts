import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Authstore } from '../../../store/auth.store';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  store = inject(Authstore);

  loading = this.store.loading;
  error = this.store.error;

  email = signal('');
  password = signal('');

  emailValid = computed(() => {
    return this.email().includes('@') && this.email().includes('.');
  });

  passwordValid = computed(() => this.password().length > 1);
  buttonIsDisabled = computed(() => {
    return !this.emailValid() || !this.passwordValid();
  });

  rememberMe = false;
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.email() || !this.password()) return;

    this.store.login(this.email(), this.password());
  }
}
