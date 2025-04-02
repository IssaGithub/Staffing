import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadAreaComponent } from '../upload-area/upload_area.component';
import { VorschauAreaComponent } from '../vorschau-area/vorschau_area.component';

@Component({
  selector: 'app-landingpage',
  imports: [CommonModule, UploadAreaComponent, VorschauAreaComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css',
})
export class LandingpageComponent {}
