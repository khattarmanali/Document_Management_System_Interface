import { yupResolver } from "@hookform/resolvers/yup";
import { Box, MenuItem, Stack, TextField } from "@mui/material";

import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAlert } from "../../contexts/AlertProvider";
import RHFTextField from "../hook-form/RHFTextField";
import FormProvider from "../hook-form/FormProvider";
import AppButton from "../buttons/AppButton";
import { UserContext } from "../../contexts/UserContext";
import MainLayout from "../../layout/MainLayout";
import RHFSelect from "../hook-form/RHFSelect";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import TagInput from "../hook-form/TagInput";
import { uploadFile } from "../../services/fileServices";
const UploadFileForm = (props) => {
  const { showAlert } = useAlert();
  const { dispatch, state } = useContext(UserContext);
  const [value, setValue] = React.useState(dayjs());
  const defaultValues = {
    major_head: "",
    minor_head: "",
    document_date: value,
    document_remarks: "",
    tags: [],
    user_id: "nitin",
    fileUpload: {},
  };

  const schema = yup.object().shape({
    major_head: yup.string().required("Major head is required"),
    minor_head: yup.string().required("Minor head is required"),
    document_date: yup.string().required("Document date is required"),
    document_remarks: yup.string().required("Document remarks is required"),
    tags: yup.array(),
    fileUpload: yup.object().required("File is required"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { watch } = methods;
  const values = watch();

  const onSubmit = async (data) => {
    console.log("vfvfvvfv", values.fileUpload);
    const formData = new FormData();

    const payload = {
      major_head: values.major_head,
      minor_head: values.minor_head,
      document_date: values.document_date,
      document_remarks: values.document_remarks,
      tags: values.tags,
      user_id: "1000",
    };
    console.log("payload", values);

    formData.append("file", values.fileUpload || "");
    formData.append("data", JSON.stringify(payload));

    const response = await uploadFile(formData, state?.token);

    if (response.status === true) {
      showAlert("success", "File uploaded successfully");
    } else {
      showAlert("error", response?.message);
    }
  };

  const selectOptions = [
    {
      value: "personal",
      label: "Personal",
      children: [
        {
          value: "john",
          label: "John",
        },
        {
          value: "lucy",
          label: "Lucy",
        },
        {
          value: "mike",
          label: "Mike",
        },
      ],
    },
    {
      value: "professional",
      label: "Professional",
      children: [
        {
          value: "accounts",
          label: "Accounts",
        },
        {
          value: "hr",
          label: "HR",
        },
        {
          value: "it",
          label: "IT",
        },
      ],
    },
  ];

  const handleSaveTag = async (tag) => {
    values.tags.push({
      tag_name: tag,
    });
  };
  const handleDeleteTag = async (tag) => {
    const index = values.tags.findIndex((item) => item.tag_name === tag);
    values.tags.splice(index, 1);
  };

  console.log("values", values);

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
                  <Stack
                    spacing={2}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        name="document_date"
                        label="Document Date"
                        value={values.document_date}
                        sx={{
                          width: "100%",
                        }}
                        disabled
                      />
                    </LocalizationProvider>
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
                    <RHFSelect
                      name="major_head"
                      label="Major Head"
                      native={false}
                      helperText="Select major head"
                    >
                      {selectOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </RHFSelect>
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
                    <RHFSelect
                      name="minor_head"
                      label="Minor Head"
                      native={false}
                      helperText="Select minor head"
                    >
                      {values.major_head === "personal"
                        ? selectOptions
                            ?.find((option) => option.value === "personal")
                            ?.children.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))
                        : selectOptions
                            ?.find((option) => option.value === "professional")
                            ?.children.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                    </RHFSelect>
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
                      name="document_remarks"
                      label="Document Remarks"
                      multiline
                      rows={4}
                      fullWidth
                    />
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
                    <TagInput
                      name="tags"
                      label="Tags"
                      existingTags={[]}
                      onSaveTag={handleSaveTag}
                      onDeleteTag={handleDeleteTag}
                    />
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
                    <TextField
                      name="fileUpload"
                      label="Upload File"
                      type="file"
                      fullWidth
                      required
                      onChange={(e) => {
                        console.log("Selected file:", e.target.files[0]);
                        const selectedFile = e.target.files[0];

                        values.fileUpload = selectedFile;
                        console.log("values", values?.fileUpload);
                      }}
                    />
                  </Stack>
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
        </Box>
      </Stack>
    </MainLayout>
  );
};

export default UploadFileForm;
