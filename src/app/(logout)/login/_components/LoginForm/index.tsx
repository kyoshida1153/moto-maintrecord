"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { Controller } from "react-hook-form";
import { TextField, SubmitButton, LoginButtonOAuth } from "@/components";
import { useLoginForm } from "./hooks";

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    isSubmitting,
    isSubmitSuccessful,
    errors,
    submitResponse,
    onSubmit,
  } = useLoginForm();

  return (
    <div className="w-full rounded bg-white p-6 shadow-md shadow-gray-300/50 md:p-8">
      <h1 className="mb-6 text-center text-xl md:mb-8 md:text-2xl">ログイン</h1>

      <Box
        component="form"
        className="mt-6 md:mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4 md:gap-6">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                required={true}
                field={field}
                label="メールアドレス"
                type="text"
                disabled={isSubmitting || isSubmitSuccessful}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                required={true}
                field={field}
                label="パスワード"
                type="password"
                disabled={isSubmitting || isSubmitSuccessful}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          <div className="flex flex-col items-center justify-center gap-4 md:mb-4 md:flex-row md:items-start md:justify-end md:gap-2">
            {submitResponse.status === "success" ? (
              <p className="flex gap-1 text-[var(--icon-color-success)] md:mr-[1em]">
                <CheckCircleIcon />
                <span className="whitespace-pre-wrap">
                  {submitResponse.message}
                </span>
              </p>
            ) : submitResponse.status === "error" ? (
              <p className="flex gap-1 text-[var(--icon-color-error)] md:mr-[1em]">
                <ErrorIcon />
                <span className="whitespace-pre-wrap">
                  {submitResponse.message}
                </span>
              </p>
            ) : (
              ""
            )}

            <SubmitButton
              variant="contained"
              isSubmitting={isSubmitting}
              isSubmitSuccessful={isSubmitSuccessful}
              labels={{
                default: "ログイン",
                isSubmitting: "送信中",
                isSubmitSuccessful: "送信完了",
              }}
            />
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
        <LoginButtonOAuth provider="google" />
      </div>

      <div className="mt-6 text-center md:mt-8 md:text-right">
        <Link href="/signup" className="text-sm underline">
          アカウントの新規作成はこちら
        </Link>
      </div>
    </div>
  );
}
