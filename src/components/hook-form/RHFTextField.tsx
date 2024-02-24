import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";

interface RHFTextFieldProps {
  name: string;
  helperText?: React.ReactNode;
  label?: string;
  multiline?: boolean;
  rows?: number;
  type?: string;

  [key: string]: any;
}

const useStyles = makeStyles(() => ({
  input: {
    backgroundColor: "white",
    "& .MuiInputLabel-root": {
      fontWeight: "normal", // Remove label boldness
    },
    "& .MuiInputBase-input": {
      fontWeight: "normal", // Remove input text boldness
    },
    "& .MuiTypography-root": {
      fontWeight: "normal", // Remove adornment boldness
    },
  },
}));

const RHFTextField: React.FC<RHFTextFieldProps> = ({
  name,
  helperText,
  ...other
}) => {
  const classes = useStyles();
  const { control } = useFormContext<FieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          InputProps={{
            style: {
              borderRadius: "10px",
            },
          }}
          label={other.label || name}
          className={classes.input}
          fullWidth
          value={
            typeof field.value === "number" && field.value === 0
              ? ""
              : field.value
          }
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
          sx={{
            "& .MuiOutlinedInput-input": {
              textTransform: "none", // Disable automatic capitalization
            },
            "& .MuiInputLabel-formControl": {
              textTransform: "none", // Disable capitalization for the label
            },
            "& .MuiFormHelperText-root": {
              textTransform: "none", // Disable capitalization for the helper text
            },
          }}
        />
      )}
    />
  );
};

RHFTextField.propTypes = {
  name: PropTypes.string.isRequired,
  helperText: PropTypes.node,
};

export default RHFTextField;
