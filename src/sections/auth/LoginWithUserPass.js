import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Card, Stack } from "@mui/material";
import React, { useContext, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { useAlert } from "../../contexts/AlertProvider";
import { UserContext } from "../../contexts/UserContext";
import RHFTextField from "../../components/hook-form/RHFTextField";
import FormProvider from "../../components/hook-form/FormProvider";
import AppButton from "../../components/buttons/AppButton";
import login from "../../assets/images/users/login.gif";

const LoginWithUserPass = (props) => {
  const { tempUser, onClose } = props;
  const { showAlert } = useAlert();

  const { dispatch, state } = useContext(UserContext);

  const defaultValues = useMemo(() => {
    return {
      username: "",
      password: "",
    };
  }, []);

  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    const { username, password } = data;
    const payload = {
      username: username,
      password: password,
    };
    showAlert("success", `Login with ${username} and ${password}`);
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
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Stack
              spacing={2}
              direction="column"
              sx={{ width: "100%", height: "100%" }}
              justifyContent="center"
              alignItems="center"
            >
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
                <RHFTextField name="username" label="Username" />
              </Stack>
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
                  name="password"
                  label="Password"
                  type="password"
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
                  Login
                </AppButton>
              </Stack>
            </Stack>
          </FormProvider>
        </Card>
      </Stack>
    </Stack>
  );
};

export default LoginWithUserPass;
