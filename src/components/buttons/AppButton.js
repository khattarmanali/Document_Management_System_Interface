import React from "react";
import Button from "@mui/material/Button";

const AppButton = ({
  children,
  isLoading,
  disabled,
  styles,
  variant,
  size,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={isLoading || disabled}
      style={styles}
      variant={variant}
      color="primary"
      size={size || "large"}
      sx={{
        width: "100%",
        borderRadius: "10px",
        padding: {
          xs: "0.6rem",
          md: "0.9rem",
        },
      }}
      onClick={props.onClick}
    >
      {isLoading ? "Loading..." : children}
    </Button>
  );
};

export default AppButton;
