export const validateFile = (file: File): boolean => {
  // Check if file is PNG
  if (file.type !== 'image/png') {
    throw new Error('Only PNG files are allowed');
  }

  // Check file size (e.g., max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    throw new Error('File size must be less than 5MB');
  }

  return true;
};

export const validateHash = (hash: string): boolean => {
  // Check if hash is valid format (64 characters hex string)
  const hashRegex = /^[a-f0-9]{64}$/i;
  if (!hashRegex.test(hash)) {
    throw new Error('Invalid hash format');
  }
  return true;
}; 