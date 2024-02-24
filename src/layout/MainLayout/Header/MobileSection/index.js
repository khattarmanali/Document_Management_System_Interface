import React from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  useMediaQuery,
  AppBar,
  ClickAwayListener,
  IconButton,
  Grow,
  Paper,
  Popper,
  Toolbar,
  Grid,
  Box,
} from "@mui/material";

// project import
import SearchSection from "../SearchSection";
import NotificationSection from "../NotificationSection";
import ProfileSection from "../ProfileSection";

// assets
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";

// ==============================|| MOBILE SECTION ||============================== //

const MobileSection = () => {
  const theme = useTheme();
  const matchMobile = useMediaQuery(theme.breakpoints.down("mobile"));

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="inherit"
        size="large"
      >
        <MoreVertTwoToneIcon sx={{ fontSize: "1.5rem" }} />
      </IconButton>
    </>
  );
};

export default MobileSection;
