"use client";

import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectBoxLink({
  name,
  label = "選択してください",
  itemList = [],
  defaultValue,
  disabled,
}: {
  name: string;
  label?: string;
  itemList?: { value: string | undefined; text: string }[];
  defaultValue?: string;
  disabled?: boolean;
}) {
  const router = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value) {
      router.push(`?date=${event.target.value}`);
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth disabled={disabled ? true : false}>
        <InputLabel id={`select-label-${name}`}>{label}</InputLabel>
        <Select
          labelId={`select-label-${name}`}
          id={`select-${name}`}
          defaultValue={defaultValue}
          label={label}
          name={name}
          onChange={handleChange}
          sx={{ backgroundColor: "#fff" }}
        >
          {itemList.length > 0 &&
            itemList.map((item) => (
              <MenuItem key={`${name}_${item.value}`} value={item.value}>
                {item.text}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
