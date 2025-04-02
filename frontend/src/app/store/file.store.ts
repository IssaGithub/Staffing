import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { UploadService } from '../components/upload-area/upload.service';

type FileState = {
  file: File | null;
  loading: boolean;
  error: string | null;
};

const initalState: FileState = {
  file: null,
  loading: false,
  error: null,
};

export const FileStore = signalStore(
  { providedIn: 'root' },
  withState(initalState),
  withMethods((store, uploadService = inject(UploadService)) => ({
    async uploadFile(file: File) {
      patchState(store, { file });
      try {
        const response = await uploadService.uploadFile(file); // Replace with actual file upload logic
        console.log('response', response);
      } catch (error) {
        const errorMessage = 'Error uploading file'; // Replace with actual error handling
        patchState(store, {
          loading: false,
          error: errorMessage,
        });
      }
    },
    async clearFile() {
      patchState(store, { file: null });
    },
  }))
);
