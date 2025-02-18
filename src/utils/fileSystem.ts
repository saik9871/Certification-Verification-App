import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

export interface Certificate {
  hash: string;
  name: string;
  college: string;
  timestamp: string;
  filename: string;
}

interface CertificateData {
  certificates: Certificate[];
}

// Initialize storage
export const initializeFileSystem = (): void => {
  if (!localStorage.getItem('certificateData')) {
    localStorage.setItem('certificateData', JSON.stringify({ certificates: [] }));
  }
};

// Generate hash
export const generateHash = (name: string, college: string): string => {
  const timestamp = new Date().getTime().toString();
  const uniqueString = `${name}-${college}-${timestamp}-${uuidv4()}`;
  return CryptoJS.SHA256(uniqueString).toString();
};

// Save certificate data
export const saveCertificateData = async (
  hash: string,
  name: string,
  college: string,
  imageData: string
): Promise<void> => {
  const dataStr = localStorage.getItem('certificateData');
  const data: CertificateData = dataStr ? JSON.parse(dataStr) : { certificates: [] };
  
  data.certificates.push({
    hash,
    name,
    college,
    timestamp: new Date().toISOString(),
    filename: `${hash}.png`
  });

  localStorage.setItem('certificateData', JSON.stringify(data));
  localStorage.setItem(`certificate_${hash}`, imageData);
};

// Get certificate by hash
export const getCertificateByHash = (hash: string): Certificate | null => {
  const dataStr = localStorage.getItem('certificateData');
  const data: CertificateData = dataStr ? JSON.parse(dataStr) : { certificates: [] };
  return data.certificates.find(cert => cert.hash === hash) || null;
};

// Get certificate image
export const getCertificateImage = (hash: string): string | null => {
  return localStorage.getItem(`certificate_${hash}`);
}; 