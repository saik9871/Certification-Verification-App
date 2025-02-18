import React from 'react';
import { Box, Button, TextField, Typography, Alert, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { generateHash, saveCertificateData, saveCertificateImage, validateFile } from '../utils';

export default function UploadCertificate() {
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
    
    try {
      // Validate inputs
      if (!file || !name || !college) {
        throw new Error('Please fill all fields');
      }
      if (name.length < 2) {
        throw new Error('Name must be at least 2 characters long');
      }
      if (college.length < 2) {
        throw new Error('College name must be at least 2 characters long');
      }

      // Process certificate
      validateFile(file);
      const newHash = generateHash(name, college);
      const imageData = await saveCertificateImage(file);
      await saveCertificateData(newHash, name, college, imageData);
      
      setHash(newHash);
      setSuccess(true);
      
      // Reset form
      setName('');
      setCollege('');
      setFile(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Certificate uploaded successfully!</Alert>}
      
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={loading}
        error={name.length > 0 && name.length < 2}
        helperText={name.length > 0 && name.length < 2 ? "Name is too short" : ""}
      />
      
      <TextField
        label="College"
        value={college}
        onChange={(e) => setCollege(e.target.value)}
        required
        disabled={loading}
        error={college.length > 0 && college.length < 2}
        helperText={college.length > 0 && college.length < 2 ? "College name is too short" : ""}
      />
      
      <Button 
        variant="contained" 
        component="label"
        disabled={loading}
      >
        {file ? 'Change Certificate' : 'Upload PNG Certificate'}
        <input
          type="file"
          hidden
          accept="image/png"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </Button>
      
      {file && <Typography>Selected: {file.name}</Typography>}
      
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        disabled={loading || !file || !name || !college}
      >
        {loading ? <CircularProgress size={24} /> : 'Submit'}
      </Button>

      {hash && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Certificate Hash:
          </Typography>
          <Typography sx={{ wordBreak: 'break-all' }}>
            {hash}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Save this hash code for future verification
          </Typography>
        </Box>
      )}
    </Box>
  );
} 