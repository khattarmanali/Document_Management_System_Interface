import { Autocomplete, TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import PropTypes from "prop-types";
import React from "react";

export default function RHFAutocomplete({
  name,
  label,
  helperText,
  options,
  ...other
}) {
  const { control, setValue } = useFormContext();

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
              helperText={error ? error.message : helperText}
              {...params}
            />
          )}
          {...other}
        />
      )}
    />
  );
}

RHFAutocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.node,
  options: PropTypes.array.isRequired,
};
