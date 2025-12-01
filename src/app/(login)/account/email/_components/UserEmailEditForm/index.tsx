"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { TextField, SubmitButton } from "@/components";
import { updateUserEmail } from "@/lib/api";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { UpdateUserEmailSchema } from "@/validations";
import type * as z from "zod";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export default function UserEmailEditForm() {
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
  } = useForm<z.infer<typeof UpdateUserEmailSchema>>({
    resolver: zodResolver(UpdateUserEmailSchema),
    defaultValues: {
      currentEmail: "",
      newEmail: "",
      confirmNewEmail: "",
    },
    mode: "onChange",
  });

  // フォームの送信開始～終了
  const onSubmit = async (values: z.infer<typeof UpdateUserEmailSchema>) => {
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    // ここからAPIでDB操作
    const updateResponse = await updateUserEmail({
      currentEmail: values.currentEmail,
      newEmail: values.newEmail,
      confirmNewEmail: values.confirmNewEmail,
    });

    setSubmitResponse({
      message: updateResponse.message,
      status: updateResponse.success === true ? "success" : "error",
    });

    if (updateResponse.success === true) {
      setTimeout(() => {
        signOut({ callbackUrl: "/login" });
      }, 3000);
    } else {
      setSubmitResponse({
        message: updateResponse.message,
        status: "error",
      });

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
          name="currentEmail"
          control={control}
          render={({ field }) => (
            <TextField
              required={true}
              field={field}
              label="現在のメールアドレス"
              type="text"
              disabled={isSubmitting || isSubmitSuccessful}
              error={!!errors.currentEmail}
              helperText={errors.currentEmail?.message}
            />
          )}
        />
        <Controller
          name="newEmail"
          control={control}
          render={({ field }) => (
            <TextField
              required={true}
              field={field}
              label="新しいメールアドレス"
              type="text"
              disabled={isSubmitting || isSubmitSuccessful}
              error={!!errors.newEmail}
              helperText={errors.newEmail?.message}
            />
          )}
        />
        <Controller
          name="confirmNewEmail"
          control={control}
          render={({ field }) => (
            <TextField
              required={true}
              field={field}
              label="新しいメールアドレス（確認）"
              type="text"
              disabled={isSubmitting || isSubmitSuccessful}
              error={!!errors.confirmNewEmail}
              helperText={errors.confirmNewEmail?.message}
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
