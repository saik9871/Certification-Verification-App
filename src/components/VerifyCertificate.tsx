import React from 'react';
import { Box, Button, TextField, Typography, Alert, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { getCertificateByHash, getCertificateImage } from '../utils';
import { validateHash } from '../utils/validation';

const VerifyCertificate = () => {
  const [hash, setHash] = useState('');
  const [certificate, setCertificate] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCertificate(null);
    setImageData(null);
    setLoading(true);

    try {
      // Validate hash
      validateHash(hash);
      
      // Get certificate data
      const cert = getCertificateByHash(hash);
      if (!cert) {
        throw new Error('Certificate not found');
      }

      // Get certificate image
      const image = getCertificateImage(hash);
      setCertificate(cert);
      setImageData(image);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleVerify} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      
      <TextField
        label="Certificate Hash"
        value={hash}
        onChange={(e) => setHash(e.target.value)}
        required
        disabled={loading}
        error={!!error}
        helperText={error || "Enter the hash code provided during certificate upload"}
        fullWidth
      />

      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        disabled={loading || !hash}
      >
        {loading ? <CircularProgress size={24} /> : 'Verify Certificate'}
      </Button>

      {certificate && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Certificate Details
          </Typography>
          <Typography>Name: {certificate.name}</Typography>
          <Typography>College: {certificate.college}</Typography>
          <Typography>Date: {new Date(certificate.timestamp).toLocaleDateString()}</Typography>
          
          {imageData && (
            <Box sx={{ mt: 2 }}>
              <img 
                src={imageData} 
                alt="Certificate" 
                style={{ 
                  maxWidth: '100%', 
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }} 
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default VerifyCertificate; 