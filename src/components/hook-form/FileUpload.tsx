import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Box, TextField } from '@mui/material';
import React, { ChangeEvent, useRef, useState } from 'react';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box sx={{ mt: 8, width: '100%' }}>
      <TextField
        variant='outlined'
        fullWidth
        value={file ? file.name : ''}
        label='Upload File'
        InputProps={{
          endAdornment: (
            <PhotoCamera
              color='action'
              sx={{ cursor: 'pointer' }}
              onClick={handleButtonClick}
            />
          ),
          style: { cursor: 'pointer', borderRadius: '10px' },
        }}
        onClick={handleButtonClick}
      />
      <input
        ref={fileInputRef}
        type='file'
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
    </Box>
  );
}
