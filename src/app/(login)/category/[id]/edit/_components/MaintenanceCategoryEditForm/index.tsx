"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function MaintenanceCategoryEditForm() {
  return (
    <div className="w-full max-w-lg">
      <Box component="form" className="mt-6 md:mt-8">
        <div className="flex flex-col gap-4 md:gap-6">
          <TextField
            id="name"
            label="カテゴリー名"
            type="text"
            name="name"
            defaultValue={"メンテナンス"}
            sx={{ backgroundColor: "#fff" }}
          />
          <div className="my-3 flex justify-center gap-3 md:my-4 md:justify-end">
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
              保存
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
}
