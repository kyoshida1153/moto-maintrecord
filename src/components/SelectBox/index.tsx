"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export function SelectBox({
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
  const [selectValue, setSelectValue] = React.useState(defaultValue);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth disabled={disabled ? true : false}>
        <InputLabel id={`select-label-${name}`}>{label}</InputLabel>
        <Select
          labelId={`select-label-${name}`}
          id={`select-${name}`}
          value={selectValue}
          defaultValue={defaultValue}
          label={label}
          name={name}
          onChange={handleChange}
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
    </Box>
  );
}
