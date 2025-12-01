"use client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker as MuixDatePicker } from "@mui/x-date-pickers/DatePicker";
import { ja } from "date-fns/locale";
import type { FieldError, FieldValues } from "react-hook-form";

export function DatePicker({
  disabled,
  field,
  fieldError,
  helperText,
  label = "日付",
  width = "170px",
}: {
  disabled?: boolean;
  field: FieldValues;
  fieldError?: FieldError;
  helperText?: string;
  label: string;
  width?: string;
}) {
  const defaultValue = field.value ? field.value : undefined;

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
        <MuixDatePicker
          defaultValue={defaultValue}
          disabled={disabled ? true : false}
          name={field.name}
          ref={field.ref}
          label={label}
          onChange={field.onChange}
          sx={{
            backgroundColor: "#fff",
            width,
          }}
        />
        {fieldError?.message ? (
          <p className="mx-[14px] mt-[3px] text-[15px] text-[#d32f2f]">
            {fieldError.message}
          </p>
        ) : (
          helperText && (
            <p className="mx-[14px] mt-[3px] text-[15px]">※{helperText}</p>
          )
        )}
      </LocalizationProvider>
    </div>
  );
}
