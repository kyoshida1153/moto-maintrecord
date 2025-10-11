"use client";

import { Box, Button, TextField } from "@mui/material";

export default function AccountNameEditForm() {
  return (
    <Box
      component="form"
      className="flex flex-col items-end gap-2 md:flex-row md:items-center"
    >
      <TextField
        id=""
        label="ユーザー名"
        type="text"
        name=""
        defaultValue={"山田太郎"}
        sx={{ backgroundColor: "#fff", width: "100%" }}
      />
      <Button
        variant="contained"
        disableElevation
        type="submit"
        sx={{
          maxWidth: "fit-content",
          px: "1.5em",
          fontSize: "16px",
          whiteSpace: "nowrap",
        }}
      >
        変更
      </Button>
    </Box>
  );
}
