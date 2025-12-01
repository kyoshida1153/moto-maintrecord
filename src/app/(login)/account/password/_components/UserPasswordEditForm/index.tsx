"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { TextField, SubmitButton } from "@/components";
import { updateUserPassword } from "@/lib/api";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { UpdateUserPasswordSchema } from "@/validations";
import type * as z from "zod";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export default function UserPasswordEditForm() {
  // フォームの送信開始～終了で使うもの
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>({
    status: undefined,
    message: "",
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm<z.infer<typeof UpdateUserPasswordSchema>>({
    resolver: zodResolver(UpdateUserPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onChange",
  });

  // フォームの送信開始～終了
  const onSubmit = async (values: z.infer<typeof UpdateUserPasswordSchema>) => {
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    // ここからAPIでDB操作
    const updateUserResponse = await updateUserPassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      confirmNewPassword: values.confirmNewPassword,
    });

    setSubmitResponse({
      message: updateUserResponse.message,
      status: updateUserResponse.success === true ? "success" : "error",
    });

    if (updateUserResponse.success === true) {
      setTimeout(() => {
        signOut({ callbackUrl: "/login" });
      }, 3000);
    } else {
      setTimeout(() => {
        reset(undefined, { keepValues: true });
      }, 300);
    }
  };

  return (
    <Box
      component="form"
      className="mt-6 w-full md:mt-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4 md:gap-6">
        <Controller
          name="currentPassword"
          control={control}
          render={({ field }) => (
            <TextField
              required={true}
              field={field}
              label="現在のパスワード"
              type="password"
              disabled={isSubmitting || isSubmitSuccessful}
              error={!!errors.currentPassword}
              helperText={errors.currentPassword?.message}
            />
          )}
        />
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <TextField
              required={true}
              field={field}
              label="新しいパスワード"
              type="password"
              disabled={isSubmitting || isSubmitSuccessful}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
            />
          )}
        />
        <Controller
          name="confirmNewPassword"
          control={control}
          render={({ field }) => (
            <TextField
              required={true}
              field={field}
              label="新しいパスワード（確認）"
              type="password"
              disabled={isSubmitting || isSubmitSuccessful}
              error={!!errors.confirmNewPassword}
              helperText={errors.confirmNewPassword?.message}
            />
          )}
        />

        {submitResponse.status === "success" ? (
          <p className="flex justify-center gap-1 text-[var(--icon-color-success)]">
            <CheckCircleIcon />
            <span className="whitespace-pre-wrap">
              {submitResponse.message}
            </span>
          </p>
        ) : submitResponse.status === "error" ? (
          <p className="flex justify-center gap-1 text-[var(--icon-color-error)]">
            <ErrorIcon />
            <span className="whitespace-pre-wrap">
              {submitResponse.message}
            </span>
          </p>
        ) : (
          ""
        )}

        {submitResponse.status === "success" && (
          <p>
            3秒後ログアウトします。新しいパスワードで再度ログインしてください。
          </p>
        )}

        <div className="flex justify-center md:justify-end">
          <SubmitButton
            variant="contained"
            isSubmitting={isSubmitting}
            isSubmitSuccessful={isSubmitSuccessful}
          />
        </div>
      </div>
    </Box>
  );
}
