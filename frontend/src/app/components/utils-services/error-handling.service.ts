import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  /**
   * Verarbeitet HTTP-Fehlerantworten und gibt eine benutzerfreundliche Fehlermeldung zurück
   */
  getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      // Spezifische Fehlercodes abfangen
      switch (error.status) {
        case 409:
          return error.error?.message || 'Diese Ressource existiert bereits.';
        case 400:
          return error.error?.message || 'Ungültige Eingabedaten.';
        case 401:
          return 'Ihre Angaben sind nicht korrekt. Bitte probieren Sie es erneut.';
        case 403:
          return 'Zugriff verweigert. Sie haben nicht die erforderlichen Rechte.';
        case 404:
          return 'Die angeforderte Ressource wurde nicht gefunden.';
        case 500:
          return 'Der Server konnte die Anfrage nicht verarbeiten. Bitte versuchen Sie es später erneut.';
        default:
          return `Fehler ${error.status}: ${
            error.error?.message || error.statusText || 'Unbekannter Fehler'
          }`;
      }
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Ein unbekannter Fehler ist aufgetreten.';
    }
  }
}
