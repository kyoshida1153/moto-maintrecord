"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

import { TextField, SubmitButton } from "@/components";
import { useMaintenanceCategoryEditFormStore } from "./stores";
import { updateMaintenanceCategory } from "@/lib/api";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { MaintenanceCategoryEditFormSchema } from "./validations";
import type * as z from "zod";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export default function MaintenanceCategoryEditFormForm({
  maintenanceCategoryId,
}: {
  maintenanceCategoryId: string;
}) {
  // フォームのデフォルト値
  const { getMaintenanceCategoryResponse } =
    useMaintenanceCategoryEditFormStore();
  const defaultValues = getMaintenanceCategoryResponse.result;

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
  } = useForm<z.infer<typeof MaintenanceCategoryEditFormSchema>>({
    resolver: zodResolver(MaintenanceCategoryEditFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
    },
    mode: "onChange",
  });

  // フォームの送信開始～終了
  const onSubmit = async (
    values: z.infer<typeof MaintenanceCategoryEditFormSchema>,
  ) => {
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    // ここからAPIでDB操作
    const maintenanceCategoryResponse = await updateMaintenanceCategory(
      { name: values.name },
      maintenanceCategoryId,
    );

    setSubmitResponse({
      message: maintenanceCategoryResponse.message,
      status:
        maintenanceCategoryResponse.success === true ? "success" : "error",
    });

    if (maintenanceCategoryResponse.success === true) {
      setTimeout(() => {
        router.back();
      }, 2000);
      return;
    } else {
      setTimeout(() => {
        reset(undefined, { keepValues: true });
      }, 300);
      return;
    }
  };

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
