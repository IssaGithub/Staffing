import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Authstore } from '../../../store/auth.store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  store = inject(Authstore);

  loading = this.store.loading;
  error = this.store.error;
  name = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');

  passwordsMatch = computed(() => {
    return this.password() === this.confirmPassword();
  });

  passwordValid = computed(() => {
    const password = this.password();
    const regex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return password.length >= 8 && regex.test(password);
  });

  emailValid = computed(() => {
    return this.email().includes('@') && this.email().includes('.');
  });

  nameIsValid = computed(() => {
    return this.name().length > 0;
  });

  buttonIsDisabled = computed(() => {
    return (
      !this.nameIsValid() ||
      !this.emailValid() ||
      !this.passwordsMatch() ||
      !this.passwordValid()
    );
  });

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.name() === '' || this.email() === '') return;
    this.store.createUser(this.email(), this.password());
  }
}
