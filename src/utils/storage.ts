import * as fs from 'fs';

export const saveCertificateImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const getCertificateImage = (filename: string): string => {
  try {
    const path = `./certificates/images/${filename}`;
    if (!fs.existsSync(path)) {
      throw new Error('Certificate image not found');
    }
    return path;
  } catch (error) {
    console.error('Error retrieving certificate image:', error);
    throw new Error('Failed to retrieve certificate image');
  }
}; 