import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-links',
  imports: [CommonModule],
  templateUrl: './nav-links.component.html',
  styleUrl: './nav-links.component.css',
})
export class NavLinksComponent {
  display = input<'desktop' | 'mobile'>('desktop');

  links = [
    { text: 'Produkte', url: '#' },
    { text: 'Lösungen', url: '#' },
    { text: 'Community', url: '#' },
    { text: 'Ressourcen', url: '#' },
    { text: 'Preise', url: '#' },
    { text: 'Kontakt', url: '#' },
  ];
}
