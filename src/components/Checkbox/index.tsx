"use client";

import { useState } from "react";
import { FormControlLabel, Checkbox as MuiCheckbox } from "@mui/material";
import type { FieldError, FieldValues } from "react-hook-form";

export function Checkbox({
  disabled,
  field,
  fieldError,
  label,
}: {
  disabled?: boolean;
  field: FieldValues;
  fieldError?: FieldError;
  label: string;
}) {
  const [defaultValue] = useState<boolean>(!!field.value);

  return (
    <div>
      <FormControlLabel
        control={
          <MuiCheckbox
            defaultChecked={defaultValue}
            sx={{
              paddingRight: "4px",
            }}
          />
        }
        disabled={disabled ? true : false}
        name={field.name}
        label={label}
        ref={field.ref}
        onChange={field.onChange}
        onBlur={field.onBlur}
        sx={{
          whiteSpace: "nowrap",
        }}
      />
      {fieldError?.message && (
        <p className="mx-[14px] mt-[3px] text-[15px] text-[#d32f2f]">
          {fieldError.message}
        </p>
      )}
    </div>
  );
}
