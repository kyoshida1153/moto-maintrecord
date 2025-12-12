"use client";

import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { Controller } from "react-hook-form";
import { SubmitButton, TextField } from "@/components";
import { useUserNameEditFormStore } from "./stores";
import { useUserNameEditForm } from "./hooks";

export default function UserNameEditFormForm() {
  const {
    control,
    handleSubmit,
    isSubmitting,
    isSubmitSuccessful,
    errors,
    submitResponse,
    onSubmit,
  } = useUserNameEditForm();
  const { getUserResponse } = useUserNameEditFormStore();

  return (
    <>
      {getUserResponse.status === "success" ? (
        <Box
          component="form"
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-row flex-nowrap gap-2">
            <div className="w-full">
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
                    variant="standard"
                  />
                )}
              />
            </div>
            <div className="pt-2">
              <SubmitButton
                variant="contained"
                isSubmitting={isSubmitting}
                isSubmitSuccessful={isSubmitSuccessful}
                labels={{
                  default: "変更",
                  isSubmitting: "変更中",
                  isSubmitSuccessful: "変更",
                }}
              />
            </div>
          </div>

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
        </Box>
      ) : (
        <p>
          {getUserResponse.message
            ? getUserResponse.message
            : "読み込みに失敗しました。"}
        </p>
      )}
    </>
  );
}
