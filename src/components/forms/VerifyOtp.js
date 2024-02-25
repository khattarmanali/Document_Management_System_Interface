import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Stack } from "@mui/material";
import React, { useContext, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import RHFCodes from "../hook-form/RHFCodes";

import FormProvider from "../hook-form/FormProvider";
import AppButton from "../buttons/AppButton";
import { useAlert } from "../../contexts/AlertProvider";
import { verifyOtp } from "../../services/loginServices";
import { UserContext } from "../../contexts/UserContext";

const VerifyOtp = (props) => {
  const { tempUser, onClose } = props;
  const { showAlert } = useAlert();

  const { dispatch, state } = useContext(UserContext);

  const defaultValues = useMemo(() => {
    return {
      mobileNumber: tempUser.mobileNumber,
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: "",
    };
  }, [tempUser.mobileNumber]);

  const schema = yup.object().shape({
    mobileNumber: yup.string(),
    code1: yup.string().required(),
    code2: yup.string().required(),
    code3: yup.string().required(),
    code4: yup.string().required(),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    const { code1, code2, code3, code4, code5, code6 } = data;
    const otp = `${code1}${code2}${code3}${code4}${code5}${code6}`;

    const payload = {
      mobile_number: tempUser.mobileNumber,
      otp: otp,
    };

    const response = await verifyOtp(payload);
    if (response.status === true) {
      showAlert("success", "OTP verified successfully");
      console.log(response, "response");
      dispatch({ type: "SET_TOKEN", payload: response.token });
    } else {
      showAlert("error", response?.data);
    }
  };

  return (
    <Stack
      spacing={2}
      direction="column"
      sx={{
        width: "100%",
        height: "100%",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          paddingX: {
            xs: "0rem",
            md: "1rem",
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack
            spacing={2}
            direction="column"
            sx={{
              width: "100%",
              height: "100%",
            }}
            justifyContent="center"
            alignItems="center"
          >
            <RHFCodes
              name="code"
              inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{
              width: "100%",
              my: "2rem",
            }}
            alignItems="center"
          >
            <AppButton variant="contained" color="primary" type="submit">
              Verify
            </AppButton>
          </Stack>
        </FormProvider>
      </Box>
    </Stack>
  );
};

export default VerifyOtp;
