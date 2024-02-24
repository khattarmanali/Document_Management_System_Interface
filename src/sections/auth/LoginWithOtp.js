import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import SendOtp from "../../components/forms/SendOtp";
import VerifyOtp from "../../components/forms/VerifyOtp";
import { UserContext } from "../../contexts/UserContext";
import { useAlert } from "../../contexts/AlertProvider";

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
  };

  useEffect(() => {
    showAlert("success", "Otp Send Successfully");
  }, [isOtpSend]);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <>
            {!isOtpSend && (
              <SendOtp
                sendOtp={() => setIsOtpSend(true)}
                updateUserData={updateUserData}
              />
            )}
            {/* {isOtpSend && (
              <VerifyOtp
                tempUser={tempUser}
                updateUserData={updateUserData}
                onClose={onClose}
              />
            )} */}
          </>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default LoginWithOtp;
