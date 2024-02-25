import React, { useContext, useEffect, useState } from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import SendOtp from "../../components/forms/SendOtp";
import VerifyOtp from "../../components/forms/VerifyOtp";
import { UserContext } from "../../contexts/UserContext";
import { useAlert } from "../../contexts/AlertProvider";
import login from "../../assets/images/users/login.gif";

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
        border: "1px solid #f0f0f0",
        my: 4,
      }}
    >
      <Stack
        direction={{
          xs: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row",
        }}
        width="100%"
        justifyContent="center"
        alignItems="center"
        height="100%"
        spacing={4}
      >
        <Box sx={{ flex: 1 }}>
          <img src={login} alt="login" style={{ width: "100%" }} />
        </Box>
        <Card
          sx={{
            width: { xs: "90%", sm: "90%", md: "20%", lg: "20%", xl: "20%" },
            flex: 1,
            boxShadow: "none",
            height: "100%",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: {
                xs: "center",
                sm: "center",
                md: "left",
                lg: "left",
                xl: "left",
              },
              color: "primary.main",
              fontWeight: 500,
              m: 5,
            }}
          >
            Login with OTP
          </Typography>

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
        </Card>
      </Stack>
    </Stack>
  );
};

export default LoginWithOtp;
