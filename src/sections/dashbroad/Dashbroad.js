// Import useState
import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import fetchInputTags, { searchFiles } from "../../services/fileServices";
import { UserContext } from "../../contexts/UserContext";
import DocumentTable from "./DocumentTable";
import AppButton from "../../components/buttons/AppButton";
import { MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormProvider from "../../components/hook-form/FormProvider";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RHFSelect, {
  RHFMultiSelect,
} from "../../components/hook-form/RHFSelect";
import RHFTextField from "../../components/hook-form/RHFTextField";
import TagInput from "../../components/hook-form/TagInput";

function Dashbroad() {
  const { dispatch, state } = useContext(UserContext);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [existingTags, setExistingTags] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const defaultValues = {
    major_head: "",
    minor_head: "",
    from_date: "",
    to_date: "",
    tags: [],
  };

  const schema = yup.object().shape({
    major_head: yup.string().required("Major head is required"),
    minor_head: yup.string().required("Minor head is required"),
    from_date: yup.string().required("From date is required"),
    to_date: yup.string().required("To date is required"),
    tags: yup.array().of(yup.string().required("Tag is required")),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { watch } = methods;
  const values = watch();

  useEffect(() => {
    // Fetch existing tags from the endpoint
    fetchExistingTags();
  }, [state?.token, existingTags]);

  const fetchExistingTags = async () => {
    try {
      const response = await fetchInputTags(state?.token);
      setExistingTags(response?.data);
    } catch (error) {
      console.error("Error fetching existing tags:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchFiles(state?.token);
        setFiles(response?.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchData();
  }, [state?.token]);

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
  };

  const handleSearch = () => {
    // Perform search logic here based on values.major_head, values.minor_head, etc.
    const results = files.filter((file) => {
      // Implement your search criteria here, for example:
      console.log("file", file);
      return (
        file.major_head.toLowerCase() === values.major_head.toLowerCase() &&
        file.minor_head.toLowerCase() === values.minor_head.toLowerCase()
        // file.document_date >= values.from_date.
      );
    });
    setFiles(results);
  };

  return (
    <MainLayout>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", my: 3 }}
      >
        <AppButton
          to="/upload"
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/upload");
          }}
        >
          Upload Data
        </AppButton>
      </Stack>
      <h1>Dashboard</h1>
      <Typography variant="h6" component="h1" gutterBottom>
        Search Document
      </Typography>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
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
              direction={{
                xs: "column",
                md: "row",
              }}
              sx={{
                width: "100%",
                height: "100%",
              }}
              justifyContent="center"
              alignItems="center"
            >
              <Stack
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
            </Stack>
            <Stack
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    name="from_date"
                    label="From Date"
                    value={values.document_date}
                    sx={{
                      width: "100%",
                    }}
                  />
                </LocalizationProvider>
              </Stack>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      name="to_date"
                      label="To Date"
                      value={values.document_date}
                      sx={{
                        width: "100%",
                      }}
                    />
                  </LocalizationProvider>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <AppButton onClick={handleSearch} variant="contained">
                Search
              </AppButton>
            </Stack>
          </Stack>
        </FormProvider>
      </Stack>

      {/* Display search results */}
      <DocumentTable data={searchResults.length > 0 ? searchResults : files} />
    </MainLayout>
  );
}

export default Dashbroad;
