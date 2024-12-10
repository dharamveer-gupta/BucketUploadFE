import axios from 'axios';
import { UploadResponse } from '../types/upload.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const uploadFile = async (
  file: File,
  userId: string,
  generateThumbnail: boolean
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', userId);
  formData.append('thumbnail', String(generateThumbnail));

  try {
    const response = await axios.post<UploadResponse>(
      `${API_URL}/api/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log(`warn: upload service response ->`, response);
    return response.data;
  } catch (error) {
    console.log(`service error: -> ${error}`);
    throw new Error('Failed to upload file');
  }
};