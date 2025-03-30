import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../../store/user/user.actions';
import { AppState } from '../../../store';
import { Observable } from 'rxjs';

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

  isLoading$!: Observable<boolean>;
  error$!: Observable<any>;

  constructor(private router: Router, private store: Store<AppState>) {
    this.isLoading$ = this.store.select(state => state.user.isLoading);
    this.error$ = this.store.select(state => state.user.error);
    
    this.isLoading$.subscribe(isLoading => {
      this.status = isLoading ? 'loading' : this.status === 'loading' ? 'idle' : this.status;
    });

    this.error$.subscribe(error => {
      if (error) {
        this.status = 'error';
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.form.email || !this.form.password) return;
    
    this.store.dispatch(login({ 
      email: this.form.email, 
      password: this.form.password 
    }));
  }
}
