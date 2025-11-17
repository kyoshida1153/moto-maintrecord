"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { Loading, OAuthButtonGoogle } from "@/components";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>({
    status: undefined,
    message: "",
  });
  const router = useRouter();

  // ログイン
  const login = async (formData: FormData): Promise<SubmitResponse> => {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const signinResponse = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (signinResponse?.ok) {
      return {
        status: "success",
        message: "ログインに成功しました。",
      };
    } else {
      return {
        status: "error",
        message: "ログインに失敗しました。",
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    const formData = new FormData(e.currentTarget);

    const loginResponse = await login(formData);
    setSubmitResponse(loginResponse);
    setIsSubmitting(false);
    if (loginResponse.status === "error") {
      return false;
    } else {
      setIsSubmitSuccessful(true);
      setTimeout(() => {
        router.push("/top");
      }, 1500);
    }
  };

  return (
    <div className="w-full rounded bg-white p-6 shadow-md shadow-gray-300/50 md:p-8">
      <h1 className="mb-6 text-center text-xl md:mb-8 md:text-2xl">ログイン</h1>

      <Box component="form" className="mt-6 md:mt-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 md:gap-6">
          <TextField
            required
            id="email"
            label="メールアドレス"
            type="text"
            name="email"
            disabled={isSubmitting || isSubmitSuccessful}
          />
          <TextField
            required
            id="password"
            label="パスワード"
            type="password"
            name="password"
            disabled={isSubmitting || isSubmitSuccessful}
          />
          <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:justify-end">
            {submitResponse.status === "success" ? (
              <p className="flex items-center gap-1 text-[var(--icon-color-success)]">
                <CheckCircleIcon />
                <span className="whitespace-pre-wrap">
                  {submitResponse.message}
                </span>
              </p>
            ) : submitResponse.status === "error" ? (
              <p className="flex items-center gap-1 text-[var(--icon-color-error)]">
                <ErrorIcon />
                <span className="whitespace-pre-wrap">
                  {submitResponse.message}
                </span>
              </p>
            ) : (
              ""
            )}
            <Button
              variant="contained"
              disableElevation
              type="submit"
              sx={{
                fontSize: "16px",
                px: "1.5em",
                display: "flex",
                gap: "0.25em",
                whiteSpace: "nowrap",
              }}
              disabled={isSubmitting || isSubmitSuccessful}
            >
              {isSubmitting ? <Loading size="18px" /> : ""}
              {isSubmitting ? <>ログイン中</> : ""}
              {isSubmitSuccessful ? <>ログイン済</> : ""}
              {!isSubmitting && !isSubmitSuccessful ? <>ログイン</> : ""}
            </Button>
          </div>
        </div>
      </Box>

      <div className="relative flex items-center justify-center">
        <span className="z-1 inline-block bg-white px-4 py-6 text-sm">
          または
        </span>
        <span className="absolute right-0 left-0 h-[1px] bg-gray-200"></span>
      </div>

      <div className="mx-auto flex max-w-[300px] flex-col justify-center gap-4 md:gap-4">
        <OAuthButtonGoogle />
      </div>

      <div className="mt-6 text-center md:mt-8 md:text-right">
        <Link href="/signup" className="text-sm underline">
          アカウントの新規作成はこちら
        </Link>
      </div>
    </div>
  );
}
