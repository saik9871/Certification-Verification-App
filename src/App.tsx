import React from 'react';
import { Box, Container, Tab, Tabs, Typography, AppBar, Toolbar } from '@mui/material';
import { useState } from 'react';
import UploadCertificate from './components/UploadCertificate';
import VerifyCertificate from './components/VerifyCertificate';

function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Certificate Verification System
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Upload Certificate" />
            <Tab label="Verify Certificate" />
          </Tabs>
        </Box>

        {tabValue === 0 && <UploadCertificate />}
        {tabValue === 1 && <VerifyCertificate />}
      </Container>
    </>
  );
}

export default App; 