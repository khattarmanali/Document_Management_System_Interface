import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Box, TextField } from "@mui/material";
import React, { useRef, useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
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
    <Box sx={{ mt: 8, width: "100%" }}>
      <TextField
        variant="outlined"
        fullWidth
        value={file ? file.name : ""}
        label="Upload File"
        InputProps={{
          endAdornment: (
            <PhotoCamera
              color="action"
              sx={{ cursor: "pointer" }}
              onClick={handleButtonClick}
            />
          ),
          style: { cursor: "pointer", borderRadius: "10px" },
        }}
        onClick={handleButtonClick}
      />
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
    </Box>
  );
}
