import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-auth-buttons',
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-auth-buttons.component.html',
  styleUrl: './nav-auth-buttons.component.css',
})
export class NavAuthButtonsComponent {
  display = input<'desktop' | 'mobile'>('desktop');
}
