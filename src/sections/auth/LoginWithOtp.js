import React, { useContext, useEffect, useState } from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import SendOtp from "../../components/forms/SendOtp";
import VerifyOtp from "../../components/forms/VerifyOtp";
import { UserContext } from "../../contexts/UserContext";
import { useAlert } from "../../contexts/AlertProvider";
import login from "../../assets/images/login.avif";

const LoginWithOtp = (props) => {
  const { dispatch, state } = useContext(UserContext);
  console.log(state, "state");
  const [pathLogs, setPathLogs] = useState([]);
  const { showAlert } = useAlert();
  const { open, onClose } = props;
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [tempUser, setTempUser] = useState({
    mobileNumber: "",
    otp: "",
  });

  const updateUserData = (key, value) => {
    setTempUser((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    console.log(tempUser, "tempUser");
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100%",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ width: "90%" }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Login with OTP
          </Typography>
          <Box sx={{ mb: 2 }}>
            {!isOtpSend && (
              <SendOtp
                sendOtp={() => setIsOtpSend(true)}
                updateUserData={updateUserData}
              />
            )}
            {isOtpSend && (
              <VerifyOtp
                tempUser={tempUser}
                updateUserData={updateUserData}
                onClose={onClose}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default LoginWithOtp;
