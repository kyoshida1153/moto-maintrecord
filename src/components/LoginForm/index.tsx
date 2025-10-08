"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";

export default function LoginForm() {
  return (
    <div className="flex h-[calc(100vh-var(--header-height)-48px)] items-center justify-center md:h-[calc(100vh-var(--header-height)-64px)]">
      <div className="m-4 mx-auto w-full max-w-lg rounded bg-white p-6 shadow-md shadow-gray-300/50 md:p-8">
        <h1 className="mb-6 text-center text-xl md:mb-8 md:text-2xl">
          ログイン
        </h1>
        <Box component="form" className="my-6 md:my-8">
          <div className="flex flex-col gap-6 md:gap-8">
            <TextField id="email" label="メールアドレス" type="text" />
            <TextField id="password" label="パスワード" type="password" />
            <Button
              variant="contained"
              disableElevation
              className="!ml-auto max-w-fit"
              type="submit"
            >
              ログイン
            </Button>
          </div>
        </Box>
        <div className="text-right">
          <Link href="/signup" className="text-sm underline">
            アカウントの新規作成はこちら
          </Link>
        </div>
      </div>
    </div>
  );
}
