import React from 'react';
import { Alert, AlertProps, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type AlertStatus = 'info' | 'success' | 'warning' | 'error';

interface CustomAlertProps {
  open: boolean;

  status: AlertStatus;
  message: string;
}

const AppAlert: React.FC<CustomAlertProps> = ({ open, status, message }) => {
  const getSeverity = (): AlertProps['severity'] => {
    switch (status) {
      case 'info':
        return 'info';
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000} // Adjust as needed
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity={getSeverity()} sx={{ width: '100%' }}>
        {message}
        <IconButton
          size='small'
          aria-label='close'
          color='inherit'
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      </Alert>
    </Snackbar>
  );
};

export default AppAlert;
