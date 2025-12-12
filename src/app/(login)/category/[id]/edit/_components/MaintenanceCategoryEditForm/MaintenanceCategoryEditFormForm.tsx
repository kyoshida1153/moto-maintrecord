"use client";

import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

import { Controller } from "react-hook-form";
import { TextField, SubmitButton } from "@/components";
import { useMaintenanceCategoryEditFormStore } from "./stores";
import { useMaintenanceCategoryCreateForm } from "./hooks";

export default function MaintenanceCategoryEditFormForm() {
  const {
    control,
    handleSubmit,
    isSubmitting,
    isSubmitSuccessful,
    errors,
    submitResponse,
    onSubmit,
  } = useMaintenanceCategoryCreateForm();

  const { getMaintenanceCategoryResponse } =
    useMaintenanceCategoryEditFormStore();

  return (
    <>
      {getMaintenanceCategoryResponse.status === "success" ? (
        <Box
          component="form"
          className="mt-6 md:mt-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4 md:gap-6">
            <Controller
              name="id"
              control={control}
              render={({ field }) => (
                <input
                  type="hidden"
                  name={field.name}
                  ref={field.ref}
                  value={field.value}
                />
              )}
            />
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  required={true}
                  field={field}
                  label="カテゴリー名"
                  type="text"
                  disabled={isSubmitting || isSubmitSuccessful}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />

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
            ) : submitResponse.status === "info" ? (
              <p className="flex items-center gap-1 text-[var(--icon-color-info)]">
                <InfoIcon />
                <span className="whitespace-pre-wrap">
                  {submitResponse.message}
                </span>
              </p>
            ) : (
              ""
            )}

            <div className="flex justify-center md:justify-end">
              <SubmitButton
                variant="contained"
                isSubmitting={isSubmitting}
                isSubmitSuccessful={isSubmitSuccessful}
                labels={{
                  default: "保存",
                  isSubmitting: "送信中",
                  isSubmitSuccessful: "送信完了",
                }}
              />
            </div>
          </div>
        </Box>
      ) : (
        <p>表示できるデータがありませんでした。</p>
      )}
    </>
  );
}
