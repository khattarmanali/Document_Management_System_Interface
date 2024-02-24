import React, { createContext, useState, useContext, forwardRef } from "react";
import {
  Alert as MuiAlert,
  Slide,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

const AlertContext = createContext(undefined);

const AlertProvider = ({ children }) => {
  const [alertInfo, setAlertInfo] = useState(null);

  const showAlert = (status, message) => {
    setAlertInfo({ status, message });
    setTimeout(() => hideAlert(), 3000);
  };

  const hideAlert = () => {
    setAlertInfo(null);
  };

  return (
    <AlertContext.Provider value={{ alertInfo, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

const Alert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AppSnackBar = () => {
  const theme = useTheme();
  const { alertInfo, hideAlert } = useAlert();

  const TransitionRight = (props) => {
    return <Slide {...props} direction="left" timeout={1000} />;
  };

  return (
    <div>
      {alertInfo !== null && (
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={!!alertInfo}
            sx={{
              width: "80%",
              "& .MuiSnackbarContent-root": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                borderRadius: "0.5rem",
                width: "100%",
              },
            }}
            onClose={hideAlert}
            TransitionComponent={TransitionRight}
          >
            <Alert
              onClose={hideAlert}
              severity={alertInfo?.status}
              sx={{
                width: "100%",
                fontWeight: "semi-medium",
                fontSize: "1.2rem",
              }}
            >
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="h4"
                  color="white"
                  sx={{
                    fontWeight: "semi-medium",
                    fontSize: "1.2rem",
                    marginRight: "auto",
                  }}
                >
                  {alertInfo?.message}
                </Typography>
              </Stack>
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </div>
  );
};

export { AlertProvider, AppSnackBar, useAlert };
