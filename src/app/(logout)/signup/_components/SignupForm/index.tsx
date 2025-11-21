"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { TextField, SubmitButton, OAuthButtonGoogle } from "@/components";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { SignupSchema } from "@/validations";
import type * as z from "zod";

import { createUser } from "@/lib/api";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export default function SignupForm() {
  // フォームの送信開始～終了で使うもの
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>({
    status: undefined,
    message: "",
  });
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  // フォームの送信開始～終了
  const onSubmit = async (values: z.infer<typeof SignupSchema>) => {
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    // ユーザー作成
    const createUserResponse = await createUser({
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });

    setSubmitResponse({
      message: createUserResponse.message,
      status: createUserResponse.success === true ? "success" : "error",
    });

    if (createUserResponse.success === false) {
      setTimeout(() => {
        reset(undefined, { keepValues: true });
      }, 300);
      return false;
    }

    // ログイン
    const loginResponse = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (loginResponse?.ok) {
      setSubmitResponse({
        message: "ログインに成功しました。",
        status: "success",
      });
      setTimeout(() => {
        router.push("/top");
      }, 1500);
    } else {
      setSubmitResponse({
        message:
          "ログインに失敗しました。\nお手数ですがログイン画面でログインしてください。\n3秒後にログイン画面に移動します。",
        status: "error",
      });
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };

  return (
    <div className="w-full rounded bg-white p-6 shadow-md shadow-gray-300/50 md:p-8">
      <h1 className="mb-6 text-center text-xl md:mb-8 md:text-2xl">
        アカウント作成
      </h1>

      <Box
        component="form"
        className="mt-6 md:mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4 md:gap-6">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                required={true}
                field={field}
                label="ユーザー名"
                type="text"
                disabled={isSubmitting || isSubmitSuccessful}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
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
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                required={true}
                field={field}
                label="パスワード（確認）"
                type="password"
                disabled={isSubmitting || isSubmitSuccessful}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
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
                default: "作成する",
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
        <OAuthButtonGoogle />
      </div>
    </div>
  );
}
