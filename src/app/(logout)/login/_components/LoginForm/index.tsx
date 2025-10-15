"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Loading from "@/components/Loading";
import ErrorIcon from "@mui/icons-material/Error";

export default function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [displayMessage, setDisplayMessage] = useState<string>("");
  const emailRef = useRef<HTMLTextAreaElement | null>(null);
  const passwordRef = useRef<HTMLSelectElement | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDisplayMessage("");

    const res = await signIn("credentials", {
      redirect: false,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    });

    if (res?.error) {
      setDisplayMessage("");
    } else if (res?.ok) {
      redirect("/login/success");
    } else {
      setDisplayMessage(
        `エラーが発生しました。再度作成を行っても解消されない場合はお問い合わせください。`,
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex h-[calc(100vh-var(--header-height)-48px)] items-center justify-center md:h-[calc(100vh-var(--header-height)-64px)]">
      <div className="m-4 mx-auto w-full max-w-lg rounded bg-white p-6 shadow-md shadow-gray-300/50 md:p-8">
        <h1 className="mb-6 text-center text-xl md:mb-8 md:text-2xl">
          ログイン
        </h1>
        <Box component="form" className="mt-6 md:mt-8" onSubmit={handleLogin}>
          <div className="flex flex-col gap-4 md:gap-6">
            <TextField
              id="email"
              label="メールアドレス"
              type="text"
              inputRef={emailRef}
            />
            <TextField
              id="password"
              label="パスワード"
              type="password"
              inputRef={passwordRef}
            />
            {displayMessage ? (
              <p className="flex justify-center">
                <ErrorIcon
                  sx={{ fontSize: "1.6em", color: "var(--icon-color-error)" }}
                />
                <span>{displayMessage}</span>
              </p>
            ) : (
              ""
            )}
            <div className="mt-3 flex justify-center md:mt-4 md:justify-end">
              {loading ? (
                <div className="text-center">
                  <Loading />
                </div>
              ) : (
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
                  ログイン
                </Button>
              )}
            </div>
          </div>
        </Box>
        <div className="mt-6 text-center md:mt-8 md:text-right">
          <Link href="/signup" className="text-sm underline">
            アカウントの新規作成はこちら
          </Link>
        </div>
      </div>
    </div>
  );
}
