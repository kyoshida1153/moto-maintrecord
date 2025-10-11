"use client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ja } from "date-fns/locale";

export default function YearPicker({
  date = undefined,
}: {
  date?: string | undefined;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <DatePicker
        label={"年"}
        openTo="year"
        views={["year"]}
        defaultValue={date ? new Date(date) : new Date()}
        sx={{
          backgroundColor: "#fff",
        }}
      />
    </LocalizationProvider>
  );
}
