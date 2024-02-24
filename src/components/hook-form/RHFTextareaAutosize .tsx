import React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const RHFTextareaAutosize: React.FC = () => {
  return (
    <TextareaAutosize
      aria-label='minimum height'
      minRows={3}
      placeholder='Minimum 2 rows'
      style={{ width: 200 }}
    />
  );
};

export default RHFTextareaAutosize;
