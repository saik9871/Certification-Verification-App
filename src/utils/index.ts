import { initializeFileSystem, generateHash, saveCertificateData, getCertificateByHash, getCertificateImage } from './fileSystem';
import { validateFile } from './validation';
import { saveCertificateImage } from './storage';

export {
  initializeFileSystem,
  generateHash,
  saveCertificateData,
  getCertificateByHash,
  getCertificateImage,
  validateFile,
  saveCertificateImage
};

// Initialize file system when app starts
try {
  initializeFileSystem();
} catch (error) {
  console.error('Failed to initialize application:', error);
} 