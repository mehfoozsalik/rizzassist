'use client';

import { toast } from 'sonner';

export const UPLOAD_GUIDES = {
  face: {
    title: 'Face not detected',
    description:
      'Upload a clear, well-lit photo of your face looking at the camera. Avoid sunglasses, heavy blur, group shots, or cropped images where the face is cut off.',
  },
  body: {
    title: 'Body not detected',
    description:
      'Upload a full-body photo standing upright, arms slightly away from your sides, with good lighting. Head-to-toe visible works best, avoid selfies, sitting poses, or heavily cropped images.',
  },
  eye: {
    title: 'Eyes / face not detected',
    description:
      'Upload a clear close-up of your face or eyes, facing the camera with good lighting. Avoid sunglasses, extreme angles, heavy filters, or photos that are too dark.',
  },
} as const;

export type UploadGuideKind = keyof typeof UPLOAD_GUIDES;

export function toastUploadGuide(kind: UploadGuideKind, customMessage?: string) {
  const guide = UPLOAD_GUIDES[kind];
  toast.error(customMessage ?? guide.title, {
    description: guide.description,
    duration: 8000,
  });
}

export function toastSuccess(message: string, description?: string) {
  toast.success(message, { description, duration: 3500 });
}

export function toastInfo(message: string, description?: string) {
  toast.message(message, { description, duration: 4000 });
}
