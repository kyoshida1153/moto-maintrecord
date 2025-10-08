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
        <Box component="form" className="mt-6 md:mt-8">
          <div className="flex flex-col gap-4 md:gap-6">
            <TextField id="email" label="メールアドレス" type="text" />
            <TextField id="password" label="パスワード" type="password" />
            <Button
              variant="contained"
              disableElevation
              className="mt-6 !ml-auto max-w-fit !px-[1.5em] md:mt-8 md:!text-[16px]"
              type="submit"
            >
              ログイン
            </Button>
          </div>
        </Box>
        <div className="mt-6 text-right md:mt-8">
          <Link href="/signup" className="text-sm underline">
            アカウントの新規作成はこちら
          </Link>
        </div>
      </div>
    </div>
  );
}
