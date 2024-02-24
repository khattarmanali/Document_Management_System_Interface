import { Stack, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import React, { useEffect, useRef } from "react";

interface RHFCodesProps {
  name?: string;
  inputs?: string[];
}

RHFCodes.propTypes = {
  name: PropTypes.string,
  inputs: PropTypes.arrayOf(PropTypes.string),
};

export default function RHFCodes({
  name = "",
  inputs = [],
  ...other
}: RHFCodesProps) {
  const codesRef = useRef<HTMLDivElement | null>(null);

  const { control, setValue } = useFormContext<FieldValues>();

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      let data: any = event.clipboardData?.getData("text") || "";
      data = data.split("");
      inputs.forEach((input, index) => setValue(input, data[index]));
      event.preventDefault();
    };
    if (codesRef.current) {
      codesRef.current.addEventListener("paste", handlePaste);
    }
    return () => {
      if (codesRef.current) {
        codesRef.current.removeEventListener("paste", handlePaste);
      }
    };
  }, [inputs, setValue]);

  const handleChangeWithNextField = (
    event: React.ChangeEvent<HTMLInputElement>,
    handleChange: (value: string) => void
  ) => {
    const { maxLength, value, name: fieldName } = event.target;

    const fieldIndex = fieldName.replace(name, "");

    const fieldIntIndex = Number(fieldIndex);

    const nextField = document.querySelector<HTMLInputElement>(
      `input[name=${name}${fieldIntIndex + 1}]`
    );

    if (value.length === maxLength && nextField) {
      nextField.focus();
    }

    handleChange(value);
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="center" ref={codesRef}>
      {inputs.map((fieldName, index) => (
        <Controller
          key={fieldName}
          name={`${name}${index + 1}`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error}
              autoFocus={index === 0}
              placeholder="-"
              onChange={(event: any) => {
                handleChangeWithNextField(event, field.onChange);
              }}
              onFocus={(event) => event.currentTarget.select()}
              InputProps={{
                sx: {
                  width: { xs: 36, sm: 56 },
                  height: { xs: 36, sm: 56 },
                  "& input": { p: 0, textAlign: "center" },
                },
              }}
              onInput={(event) => {
                // Allow only numbers
                const inputElement = event.target as HTMLInputElement;
                inputElement.value = inputElement.value.replace(/[^0-9]/g, "");
              }}
              inputProps={{
                maxLength: 1,
              }}
              {...other}
            />
          )}
        />
      ))}
    </Stack>
  );
}
