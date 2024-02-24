// import { yupResolver } from "@hookform/resolvers/yup";
// import { Box, Stack } from "@mui/material";
// import React, { useMemo } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import * as yup from "yup";

// import AppButton from "@/components/buttons/AppButton";
// import FormProvider from "@/components/hook-form/FormProvider";
// import RHFCodes from "@/components/hook-form/RHFCodes";

// import { useAlert } from "@/context/AlertProvider";
// import { setUser } from "@/redux/features/userSlice";
// import { AppDispatch } from "@/redux/store";
// import { useVerifyOtpMutation } from "@/services/LoginServices";

// const VerifyOtp = (props) => {
//   const dispatch = useDispatch();
//   const { tempUser, onClose } = props;
//   const { showAlert } = useAlert();

//   const { mutate, isSuccess, isLoading, isError } = useVerifyOtpMutation();

//   const defaultValues = useMemo(() => {
//     return {
//       mobileNumber: tempUser.mobileNumber,
//       code1: "",
//       code2: "",
//       code3: "",
//       code4: "",
//     };
//   }, [tempUser.mobileNumber]);

//   const schema = yup.object().shape({
//     mobileNumber: yup.string(),
//     code1: yup.string().required(),
//     code2: yup.string().required(),
//     code3: yup.string().required(),
//     code4: yup.string().required(),
//   });

//   const methods = useForm({
//     resolver: yupResolver(schema),
//     defaultValues,
//   });

//   const { handleSubmit } = methods;

//   const onSubmit = async (data) => {
//     const { code1, code2, code3, code4, mobileNumber } = data;
//     const otp = `${code1}${code2}${code3}${code4}`;

//     const payload = {
//       mobileNumber: tempUser.mobileNumber,
//       otp: otp,
//     };

//     mutate(payload, {
//       onSuccess: (data) => {
//         if (data?.data?.name !== "" || data?.data?.emailId !== "") {
//           onClose();
//         }
//         showAlert("success", "Otp Verified Successfully");
//         dispatch(setUser(data?.data || {}));
//       },
//       onError: (error) => {
//         console.log(error, "error");
//       },
//     });
//   };

//   return (
//     <Stack
//       spacing={2}
//       direction="column"
//       sx={{
//         width: "100%",
//         height: "100%",
//       }}
//       justifyContent="center"
//       alignItems="center"
//     >
//       <Box
//         sx={{
//           height: "100%",
//           width: "100%",
//           paddingX: {
//             xs: "0rem",
//             md: "1rem",
//           },
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <FormProvider methods={methods} onSubmit={onSubmit}>
//           <Stack
//             spacing={2}
//             direction="column"
//             sx={{
//               width: "100%",
//               height: "100%",
//             }}
//             justifyContent="center"
//             alignItems="center"
//           >
//             <RHFCodes
//               name="code"
//               inputs={["code1", "code2", "code3", "code4"]}
//             />
//           </Stack>
//           <Stack
//             direction="row"
//             spacing={2}
//             justifyContent="center"
//             sx={{
//               width: "100%",
//               my: "2rem",
//             }}
//             alignItems="center"
//           >
//             <AppButton
//               variant="contained"
//               color="primary"
//               type="submit"
//               isLoading={isLoading}
//             >
//               Verify
//             </AppButton>
//           </Stack>
//         </FormProvider>
//       </Box>
//     </Stack>
//   );
// };

// export default VerifyOtp;
