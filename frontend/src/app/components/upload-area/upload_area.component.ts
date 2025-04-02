import {
  Component,
  HostBinding,
  HostListener,
  inject,
  Signal,
} from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FileStore } from '../../store/file.store';

@Component({
  selector: 'app-upload-area',
  templateUrl: './upload_area.component.html',
  styleUrls: ['./upload_area.component.css'],
  imports: [CommonModule, DragDropModule],
})
export class UploadAreaComponent {
  fileStore = inject(FileStore);
  selectedFile: Signal<File | null> = this.fileStore.file;
  isDragging = false;

  // Host-Element Event-Handler
  @HostListener('dragover', ['$event'])
  onHostDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  @HostListener('dragleave', ['$event'])
  onHostDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  @HostListener('drop', ['$event'])
  onHostDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer?.files.length) {
      this.handleFile(event.dataTransfer.files);
    }
  }

  // CSS-Klassen direkt auf Host binden
  @HostBinding('class.dragging')
  get isDraggingClass() {
    return this.isDragging;
  }

  onFileSelected(event: Event) {
    if (event.target instanceof HTMLInputElement && event.target.files) {
      this.handleFile(event.target.files);
    } else {
      console.error('No files selected or invalid event target');
    }
  }

  private handleFile(file: FileList) {
    // Datei-Verarbeitung hier
    //Prüfe ob es eine PDF ist
    if (file[0].type !== 'application/pdf') {
      alert('Bitte eine PDF-Datei hochladen!');
      return;
    }
    this.fileStore.uploadFile(file[0]); // Upload-Service aufrufen
  }
}
