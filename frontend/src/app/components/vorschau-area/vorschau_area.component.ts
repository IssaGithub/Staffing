import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { FileStore } from '../../store/file.store';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
@Component({
  selector: 'app-vorschau-area',
  templateUrl: './vorschau_area.component.html',
  styleUrls: ['./vorschau_area.component.css'],
  imports: [NgxExtendedPdfViewerModule],
})
export class VorschauAreaComponent {
  destroyRef = inject(DestroyRef);
  fileStore = inject(FileStore);
  file = this.fileStore.file;
  pdfSrcSignal = signal<Uint8Array | null>(null);

  //Wird die Componente zerstört, so wird die Datei gelöscht und die pdfSrcSignal auf null gesetzt.
  constructor() {
    this.destroyRef.onDestroy(() => {
      this.pdfSrcSignal.set(null);
      this.fileStore.clearFile();
    });

    // Wenn die Datei geändert wird, wird die pdfSrcSignal auf null gesetzt und die neue Datei gelesen.
    // Nur so kann reaktiv auf das Einlesen einer Datei reagiert werden.
    effect(() => {
      const pdfFile = this.file();
      if (!pdfFile) {
        this.pdfSrcSignal.set(null);
        return;
      }
      this.readPdfFile(pdfFile);
    });
  }

  // Liest die PDF-Datei ein und setzt die pdfSrcSignal auf den Uint8Array der Datei.
  private readPdfFile(pdfFile: Blob): void {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const arrayBuffer = fileReader.result as ArrayBuffer;
      const uint8Array = new Uint8Array(arrayBuffer);
      this.pdfSrcSignal.set(uint8Array);
    };

    fileReader.readAsArrayBuffer(pdfFile);
  }
}
