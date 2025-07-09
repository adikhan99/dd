import React from 'react';
import { Grid, Typography } from '@mui/material';

interface DocumentUploadProps {
  setSelectedFile: (file: File | null) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ setSelectedFile }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  return (
    <Grid container direction="column" spacing={2} mt={5}>
      <Grid item>
        <Typography fontSize={13} variant="body2">
          Select Attachment
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </Grid>
    </Grid>
  );
};

export default DocumentUpload;
