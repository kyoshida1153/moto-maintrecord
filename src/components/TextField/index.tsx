"use client";

import { TextField as MuiTextField } from "@mui/material";
import { HTMLInputTypeAttribute } from "react";
import type { FieldValues } from "react-hook-form";

export function TextField({
  defaultValue,
  disabled = false,
  error = false,
  field,
  helperText,
  label,
  required = false,
  type,
  variant = "outlined",
}: {
  defaultValue?: string;
  disabled?: boolean;
  error?: boolean;
  field?: FieldValues;
  helperText?: string;
  label: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  variant?: "filled" | "outlined" | "standard";
}) {
  return (
    <MuiTextField
      defaultValue={defaultValue}
      disabled={disabled}
      error={error}
      {...field}
      helperText={helperText}
      label={label}
      required={required}
      type={type}
      variant={variant}
      sx={{
        width: "100%",
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#fff",
        },
        "& .MuiFormHelperText-root": {
          fontSize: "15px",
          whiteSpace: "pre-line",
        },
        "& .MuiFormHelperText-root:not(.Mui-error)": {
          color: "#333",
        },
      }}
    />
  );
}
