"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectBox({
  name = "select",
  label = "選択してください",
  defaultValue = "",
  itemList = [],
}: {
  name?: string;
  label?: string;
  defaultValue?: string;
  itemList: { value: string; text: string }[];
}) {
  const [selectValue, setSelectValue] = React.useState(defaultValue);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
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
          {itemList.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
