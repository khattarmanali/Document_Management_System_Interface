import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Stack } from "@mui/material";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAlert } from "../../contexts/AlertProvider";
import RHFTextField from "../hook-form/RHFTextField";
import FormProvider from "../hook-form/FormProvider";
import AppButton from "../buttons/AppButton";
import { generateOtp } from "../../services/loginServices";

const SendOtp = (props) => {
  const { sendOtp, updateUserData } = props;
  const { showAlert } = useAlert();

  const defaultValues = {
    mobileNumber: "",
  };

  const schema = yup.object().shape({
    mobileNumber: yup.string().required().min(10).max(10),
    otp: yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, watch } = methods;
  const values = watch();

  const onSubmit = async (data) => {
    console.log(data, "data");
    generateOtp(data.mobileNumber);

    // updateUserData("mobileNumber", data.mobileNumber);
    // mutate(data, {
    //   onSuccess: (data) => {
    //     showAlert("success", "Otp Send Successfully");
    //     sendOtp();
    //   },
    //   onError: (error) => {
    //     console.log(error, "error");
    //   },
    // });
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
      {/* Assuming `AppModal` takes `open` and `onClose` as props */}
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
            <RHFTextField
              name="mobileNumber"
              label="Mobile Number"
              InputProps={{
                startAdornment: "+91",
                maxLength: 10,
                inputMode: "numeric",
                pattern: "[0-9]*",
                type: "tel",
              }}
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
            <AppButton
              variant="contained"
              color="primary"
              type="submit"
              disabled={values.mobileNumber.length !== 10}
            >
              Login Now
            </AppButton>
          </Stack>
        </FormProvider>
      </Box>
    </Stack>
  );
};

export default SendOtp;
