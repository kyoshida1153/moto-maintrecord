"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Loading from "@/components/Loading";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        router.push("/refresh");
      }, 1500);
    }
  };

  return (
    <div className="flex h-[calc(100vh-var(--header-height)-48px)] items-center justify-center md:h-[calc(100vh-var(--header-height)-64px)]">
      <div className="m-4 mx-auto w-full max-w-lg rounded bg-white p-6 shadow-md shadow-gray-300/50 md:p-8">
        <h1 className="mb-6 text-center text-xl md:mb-8 md:text-2xl">
          ログイン
        </h1>
        <Box component="form" className="mt-6 md:mt-8" onSubmit={onSubmit}>
          <div className="flex flex-col gap-4 md:gap-6">
            <TextField
              id="email"
              label="メールアドレス"
              type="text"
              name="email"
              disabled={isSubmitting || isSubmitSuccessful}
            />
            <TextField
              id="password"
              label="パスワード"
              type="password"
              name="password"
              disabled={isSubmitting || isSubmitSuccessful}
            />
            <div className="mt-3 flex flex-col items-center justify-center gap-2 md:mt-4 md:flex-row md:justify-end">
              {submitResponse.status === "success" && (
                <p className="flex items-center gap-1 text-[var(--icon-color-success)]">
                  <CheckCircleIcon />
                  <span className="whitespace-pre-wrap">
                    {submitResponse.message}
                  </span>
                </p>
              )}
              {submitResponse.status === "error" && (
                <p className="flex items-center gap-1 text-[var(--icon-color-error)]">
                  <ErrorIcon />
                  <span className="whitespace-pre-wrap">
                    {submitResponse.message}
                  </span>
                </p>
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
        <div className="mt-6 text-center md:mt-8 md:text-right">
          <Link href="/signup" className="text-sm underline">
            アカウントの新規作成はこちら
          </Link>
        </div>
      </div>
    </div>
  );
}
