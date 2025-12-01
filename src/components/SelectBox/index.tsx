"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { FieldError, FieldValues } from "react-hook-form";

export function SelectBox({
  disabled,
  field,
  fieldError,
  helperText,
  itemList = [],
  label = "選択してください",
}: {
  disabled?: boolean;
  field: FieldValues;
  fieldError?: FieldError;
  helperText?: string;
  itemList?: { value: string; text: string }[];
  label?: string;
}) {
  const [defaultValue] = useState<string>(field.value || "");

  return (
    <Box>
      <FormControl fullWidth disabled={disabled ? true : false}>
        <InputLabel id={`select-label-${field.name}`}>{label}</InputLabel>
        <Select
          defaultValue={defaultValue}
          id={`select-${field.name}`}
          label={label}
          labelId={`select-label-${field.name}`}
          name={field.name}
          ref={field.ref}
          onChange={field.onChange}
          onBlur={field.onBlur}
          sx={{ backgroundColor: "#fff" }}
        >
          {itemList.length > 0 &&
            itemList.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.text}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {fieldError?.message ? (
        <p className="mx-[14px] mt-[3px] text-[15px] text-[#d32f2f]">
          {fieldError.message}
        </p>
      ) : (
        helperText && (
          <p className="mx-[14px] mt-[3px] text-[15px]">※{helperText}</p>
        )
      )}
    </Box>
  );
}
