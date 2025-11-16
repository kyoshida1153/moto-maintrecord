"use client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker as MuixDatePicker } from "@mui/x-date-pickers/DatePicker";
import { ja } from "date-fns/locale";

export function DatePicker({
  name,
  label = "日付",
  className,
  defaultValue,
  disabled,
}: {
  name: string;
  label?: string;
  className?: string;
  defaultValue?: Date;
  disabled?: boolean;
}) {
  const date = defaultValue ? defaultValue : new Date();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <MuixDatePicker
        label={label}
        name={name}
        defaultValue={date}
        className={className}
        sx={{ backgroundColor: "#fff", width: "100%", maxWidth: "170px" }}
        disabled={disabled ? true : false}
      />
    </LocalizationProvider>
  );
}
