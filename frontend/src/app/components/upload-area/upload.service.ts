import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  uploadFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file, file.name);
      // Simulate an API call
      setTimeout(() => {
        resolve({ status: 200, message: 'File uploaded successfully' });
      }, 1000);
    });
  }

  clearFile(): Promise<any> {
    return new Promise((resolve, reject) => {
      // Simulate an API call
      setTimeout(() => {
        resolve({ status: 200, message: 'File cleared successfully' });
      }, 1000);
    });
  }
}
