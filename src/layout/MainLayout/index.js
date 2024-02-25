import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import { useMediaQuery, AppBar, Box, Toolbar } from "@mui/material";
import { drawerWidth } from "../../config";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { UserContext } from "../../contexts/UserContext";

const Main = styled((props) => <main {...props} />)(({ theme }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up("md")]: {
    marginLeft: -drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
}));

const OutletDiv = styled((props) => <div {...props} />)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3),
    border: "2px solid red",
  },
  padding: theme.spacing(5),
}));

const MainLayoutWrapper = () => {
  const { state } = useContext(UserContext);

  // Check if the token is not equal to the string "null"
  if (state.token !== "null") {
    return <MainLayout />;
  }

  return null; // Render nothing if the token is "null"
};

const MainLayout = () => {
  const { state } = useContext(UserContext);

  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  React.useEffect(() => {
    setDrawerOpen(matchUpMd);
  }, [matchUpMd]);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <AppBar position="fixed" sx={{ zIndex: 1200 }}>
        <Toolbar>
          <Header drawerOpen={drawerOpen} drawerToggle={handleDrawerToggle} />
        </Toolbar>
      </AppBar>
      <Sidebar drawerOpen={drawerOpen} drawerToggle={handleDrawerToggle} />
      <Main
        style={{
          ...(drawerOpen && {
            transition: theme.transitions.create("margin", {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
            marginRight: "inherit",
          }),
        }}
      >
        <Box sx={theme.mixins.toolbar} />
        <OutletDiv>
          <Outlet />
        </OutletDiv>
      </Main>
    </Box>
  );
};

export default MainLayoutWrapper;
