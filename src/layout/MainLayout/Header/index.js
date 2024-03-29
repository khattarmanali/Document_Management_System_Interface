import PropTypes from "prop-types";
import React from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Button, Grid, IconButton } from "@mui/material";

// project import
import SearchSection from "./SearchSection";
import ProfileSection from "./ProfileSection";
import NotificationSection from "./NotificationSection";
import { drawerWidth } from "../../../config";

// assets
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import logo from "../../../assets/images/logo.svg";
import AppButton from "../../../components/buttons/AppButton";

// ==============================|| HEADER ||============================== //

const Header = ({ drawerToggle }) => {
  const theme = useTheme();

  return (
    <>
      <Box width={drawerWidth}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Grid item>
              <Box mt={0.5}>DMS</Box>
            </Grid>
          </Box>
          <Grid item>
            <IconButton
              edge="start"
              sx={{ mr: theme.spacing(1.25) }}
              color="inherit"
              aria-label="open drawer"
              onClick={drawerToggle}
              size="large"
            >
              <MenuTwoToneIcon sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

Header.propTypes = {
  drawerToggle: PropTypes.func,
};

export default Header;
