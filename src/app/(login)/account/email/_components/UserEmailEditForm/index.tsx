"use client";

import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { Controller } from "react-hook-form";
import { TextField, SubmitButton } from "@/components";
import { useUserEmailEditForm } from "./hooks";

export default function UserEmailEditForm() {
  const {
    control,
    handleSubmit,
    isSubmitting,
    isSubmitSuccessful,
    errors,
    submitResponse,
    onSubmit,
  } = useUserEmailEditForm();

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
