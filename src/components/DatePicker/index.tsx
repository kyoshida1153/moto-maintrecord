"use client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker as MuixDatePicker } from "@mui/x-date-pickers/DatePicker";
import { ja } from "date-fns/locale";

export default function DatePicker({
  name = "date",
  label = "日付",
  className = "",
  date = undefined,
}: {
  name: string;
  label: string;
  className?: string;
  date?: string | undefined;
}) {
  return (
    // あとでやる: 文言調整
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <MuixDatePicker
        label={label}
        name={name}
        defaultValue={date ? new Date(date) : undefined}
        // defaultValue={new Date("2025-10-01")}
        className={className}
        sx={{ backgroundColor: "#fff", width: "100%", maxWidth: "170px" }}
      />
    </LocalizationProvider>
  );
}
