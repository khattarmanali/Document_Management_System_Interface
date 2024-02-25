import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Stack } from "@mui/material";

import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAlert } from "../../contexts/AlertProvider";
import RHFTextField from "../hook-form/RHFTextField";
import FormProvider from "../hook-form/FormProvider";
import AppButton from "../buttons/AppButton";
import { generateOtp } from "../../services/loginServices";
import { UserContext } from "../../contexts/UserContext";
import MainLayout from "../../layout/MainLayout";

const UploadFileForm = (props) => {
  const { sendOtp, updateUserData } = props;
  const { showAlert } = useAlert();
  const { dispatch, state } = useContext(UserContext);
  console.log(state, "hfvjvbfvbk");

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
    const response = await generateOtp(data.mobileNumber);

    if (response.status === true) {
      sendOtp();
      updateUserData("mobileNumber", data.mobileNumber);
      showAlert("success", "OTP sent successfully");
    } else {
      console.log(response?.data, "response");
      showAlert("error", response?.data);
    }
  };

  return (
    <MainLayout>
      <Stack
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          height: "100%",
        }}
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
                  type: "number",
                  // onhove hide the icrease and decrease button
                  style: { WebkitAppearance: "none" },
                }}
                placeholder="Enter your mobile number"
                fullWidth
                required
                sx={{
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{
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
                Send OTP
              </AppButton>
            </Stack>
          </FormProvider>
        </Box>
      </Stack>
    </MainLayout>
  );
};

export default UploadFileForm;
