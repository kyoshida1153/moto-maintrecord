"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createUser } from "./actions";
import Loading from "@/components/Loading";
import { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export default function SignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>({
    status: undefined,
    message: "",
  });
  const router = useRouter();

  // アカウント作成
  const signup = async (formData: FormData): Promise<SubmitResponse> => {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const signupResponse = await createUser(data);

    if (signupResponse.success === false) {
      return {
        status: "error",
        message: signupResponse.message,
      };
    } else {
      return {
        status: "success",
        message: signupResponse.message,
      };
    }
  };

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
        message:
          "ログインに失敗しました。\nお手数ですがログイン画面でログインしてください。\n3秒後にログイン画面に移動します。",
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

    const signupResponse = await signup(formData);
    setSubmitResponse(signupResponse);
    if (signupResponse.status === "error") {
      setIsSubmitting(false);
      return false;
    }

    const loginResponse = await login(formData);
    setIsSubmitting(false);
    setIsSubmitSuccessful(true);
    setSubmitResponse(loginResponse);

    if (loginResponse.status === "error") {
      setTimeout(() => {
        router.push("/login");
      }, 3000);
      return false;
    } else {
      setTimeout(() => {
        router.push("/refresh");
      }, 1500);
      return true;
    }
  };

  return (
    <div className="flex h-[calc(100vh-var(--header-height)-48px)] items-center justify-center md:h-[calc(100vh-var(--header-height)-64px)]">
      <div className="m-4 mx-auto w-full max-w-lg rounded bg-white p-6 shadow-md shadow-gray-300/50 md:p-8">
        <h1 className="mb-6 text-center text-xl md:mb-8 md:text-2xl">
          アカウント作成
        </h1>
        <Box component="form" className="mt-6 md:mt-8" onSubmit={onSubmit}>
          <div className="flex flex-col gap-4 md:gap-6">
            <TextField
              id="name"
              label="ユーザー名"
              type="text"
              name="name"
              disabled={isSubmitting || isSubmitSuccessful}
            />
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
              disabled={isSubmitting || isSubmitSuccessful}
            />
            <TextField
              id="password_confirm"
              label="パスワード（確認）"
              type="password"
              name="password"
              disabled={isSubmitting || isSubmitSuccessful}
            />
            <div className="mt-3 flex flex-col items-center justify-center gap-2 md:mt-4 md:flex-row md:justify-end">
              {submitResponse.status === "success" && (
                <p className="flex items-center gap-1 text-[var(--icon-color-success)] md:mr-[1em]">
                  <CheckCircleIcon />
                  <span className="whitespace-pre-wrap">
                    {submitResponse.message}
                  </span>
                </p>
              )}
              {submitResponse.status === "error" && (
                <p className="flex items-center gap-1 text-[var(--icon-color-error)] md:mr-[1em]">
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
                {isSubmitting ? <>作成中</> : ""}
                {isSubmitSuccessful ? <>作成済</> : ""}
                {!isSubmitting && !isSubmitSuccessful ? <>作成する</> : ""}
              </Button>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
