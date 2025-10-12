"use client";

import { Box, Button, TextField } from "@mui/material";

export default function AccountEmailEditForm() {
  return (
    <div className="w-full max-w-lg">
      <Box component="form" className="mt-6 md:mt-8">
        <div className="flex flex-col gap-4 md:gap-6">
          <TextField
            id="email"
            label="メールアドレス"
            type="text"
            sx={{ backgroundColor: "#fff" }}
          />
          <TextField
            id="email-confirm"
            label="メールアドレス（確認）"
            type="text"
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
              変更
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
}
