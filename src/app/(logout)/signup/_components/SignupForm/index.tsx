"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function SignupForm() {
  return (
    <div className="flex h-[calc(100vh-var(--header-height)-48px)] items-center justify-center md:h-[calc(100vh-var(--header-height)-64px)]">
      <div className="m-4 mx-auto w-full max-w-lg rounded bg-white p-6 shadow-md shadow-gray-300/50 md:p-8">
        <h1 className="mb-6 text-center text-xl md:mb-8 md:text-2xl">
          アカウント作成
        </h1>
        <Box component="form" className="mt-6 md:mt-8">
          <div className="flex flex-col gap-4 md:gap-6">
            <TextField id="name" label="ユーザー名" type="text" />
            <TextField id="email" label="メールアドレス" type="text" />
            <TextField id="password" label="パスワード" type="password" />
            <TextField
              id="password-confirm"
              label="パスワード（確認）"
              type="password"
            />
            <div className="mt-3 flex justify-center md:mt-4 md:justify-end">
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
                登録
              </Button>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
