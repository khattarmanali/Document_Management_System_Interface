import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { searchFiles } from "../../services/fileServices";
import { UserContext } from "../../contexts/UserContext";
import DocumentTable from "./DocumentTable";
import AppButton from "../../components/buttons/AppButton";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Dashbroad() {
  const { dispatch, state } = useContext(UserContext);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchFiles(state?.token);
        setFiles(response?.data);
      } catch (error) {
        console.error("Error fetching files:", error);
        // Handle error, perhaps dispatch an action to update state
      }
    };

    fetchData();
  }, [state?.token]);

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

      <DocumentTable data={files} />
    </MainLayout>
  );
}

export default Dashbroad;
