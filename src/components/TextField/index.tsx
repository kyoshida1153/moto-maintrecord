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
  multiline,
  required = false,
  rows = 1,
  type,
  variant = "outlined",
  width = "100%",
}: {
  defaultValue?: number | string;
  disabled?: boolean;
  error?: boolean;
  field: FieldValues;
  helperText?: string;
  label: string;
  multiline?: boolean;
  required?: boolean;
  rows?: number | string;
  type?: HTMLInputTypeAttribute;
  variant?: "filled" | "outlined" | "standard";
  width?: string;
}) {
  return (
    <MuiTextField
      defaultValue={defaultValue}
      disabled={disabled}
      error={error}
      {...field}
      helperText={helperText}
      label={label}
      multiline={multiline}
      required={required}
      rows={rows}
      type={type}
      variant={variant}
      sx={{
        "& .MuiInputBase-input": {
          textAlign: type === "number" ? "right" : "left",
        },
        "& .MuiOutlinedInput-root": {
          width: width,
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
