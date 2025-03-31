import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Authstore } from '../../../store/auth.store';

@Component({
  selector: 'app-nav-auth-buttons',
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-auth-buttons.component.html',
  styleUrl: './nav-auth-buttons.component.css',
})
export class NavAuthButtonsComponent {
  authStore = inject(Authstore);
  isAuthenticated = this.authStore.isAuthenticated;
  logout = this.authStore.logout;

  display = input<'desktop' | 'mobile'>('desktop');

  navButtons = computed(() => {
    const displayMode = this.display();
    return [
      {
        name: 'Anmelden',
        link: '/login',
        icon: 'login',
        show: !this.isAuthenticated(),
        css:
          displayMode === 'desktop'
            ? 'px-4 py-1 text-sm border rounded-md text-gray-800 hover:bg-gray-100 cursor-pointer'
            : 'w-full px-4 py-1 border rounded text-gray-800 text-center hover:bg-gray-100 cursor-pointer',
      },
      {
        name: 'Registrieren',
        link: '/register',
        icon: 'person_add',
        show: !this.isAuthenticated(),
        css:
          displayMode === 'desktop'
            ? 'px-4 py-1 text-sm rounded-md text-white bg-black hover:bg-gray-900 cursor-pointer'
            : 'w-full px-4 py-1 bg-black text-white rounded text-center cursor-pointer',
      },
      {
        name: 'Abmelden',
        link: '',
        icon: 'logout',
        show: this.isAuthenticated(),
        action: () => this.logout(),
        css:
          displayMode === 'desktop'
            ? 'px-4 py-1 text-sm border rounded-md text-gray-800 hover:bg-gray-100 cursor-pointer'
            : 'w-full px-4 py-1 border rounded text-gray-800 text-center hover:bg-gray-100 cursor-pointer',
      },
    ];
  });
}
