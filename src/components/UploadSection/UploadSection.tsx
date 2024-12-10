import { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { uploadFile } from '../services/upload.service';
import styles from './UploadSection.module.css';
import { FileError } from '../types/upload.types';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { convertFileToBlobURL } from '@/utils/util';

interface UploadSectionProps {
  userId: string;
  generateThumbnail?: boolean;
}

const UploadSection: React.FC<UploadSectionProps> = ({ 
  userId, 
  generateThumbnail = false 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileError, setFileError] = useState<FileError>({ 
    error: false, 
    errorMsg: '' 
  });
  const [uploadedUrls, setUploadedUrls] = useState<{
    rawUrl?: string;
    compressedUrl?: string;
    thumbnailUrl?: string;
  }>({});

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setFileError({ error: false, errorMsg: '' });

    try {
        console.log(`warn: BE upload API requested -> ${(file.size / (1024 * 1024)).toFixed(2)}mb in decimal system`);
        // const blobURL = convertFileToBlobURL(file)
        const response = await uploadFile(file, userId, generateThumbnail);
        console.log(`warn: response -> `, response);
        
        setUploadedUrls(response);
    } catch (error) {
        console.log(`error: -> ${error}`);
      setFileError({ 
        error: true, 
        errorMsg: 'Failed to upload file. Please try again.' 
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <input
        type="file"
        id="fileInput"
        className={styles.fileInput}
        onChange={handleFileUpload}
        accept="image/*"
        disabled={isUploading}
      />
      <label htmlFor="fileInput" className={styles.uploadButton}>
        {isUploading ? (
          <CircularProgress style={{color: "#fff"}} size={24} />
        ) : (
          <>
            <CloudUploadIcon fontSize="small" />
            Upload Image
          </>
        )}
      </label>

      {fileError.error && (
        <div className={styles.errorMessage}>{fileError.errorMsg}</div>
      )}

      {uploadedUrls.rawUrl && (
        <div className={styles.previewContainer}>
          <h3>Uploaded Images:</h3>
          <div className={styles.urlList}>
            <p>Raw URL: {uploadedUrls.rawUrl}</p>
            <p>Compressed URL: {uploadedUrls.compressedUrl}</p>
            {uploadedUrls.thumbnailUrl && (
              <p>Thumbnail URL: {uploadedUrls.thumbnailUrl}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadSection;