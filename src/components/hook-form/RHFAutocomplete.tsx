import { Autocomplete, TextField } from "@mui/material";
import { useFormContext, Controller, FieldValues } from "react-hook-form";
import PropTypes from "prop-types";
import React from "react";

interface RHFAutocompleteProps {
  name: string;
  label: string;
  helperText?: React.ReactNode;
  options: any[]; // Replace 'any[]' with the actual type of your options
  // Add any other props here
}

RHFAutocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.node,
  options: PropTypes.array.isRequired, // Update with the actual PropTypes for options
  // Add prop types for any other props here
};

export default function RHFAutocomplete({
  name,
  label,
  helperText,
  options,
  ...other
}: RHFAutocompleteProps) {
  const { control, setValue } = useFormContext<FieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          options={options}
          onChange={(event, newValue) =>
            setValue(name, newValue, { shouldValidate: true })
          }
          renderInput={(params) => (
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  "&.Mui-focused fieldset legend": {},
                },
              }}
              label={label}
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...params}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
