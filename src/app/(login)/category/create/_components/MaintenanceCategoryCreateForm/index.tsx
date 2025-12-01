"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { TextField, SubmitButton } from "@/components";
import { createMaintenanceCategory } from "@/lib/api";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { MaintenanceCategoryCreateFormSchema } from "./validations";
import type * as z from "zod";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export default function MaintenanceCategoryCreateForm() {
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
  } = useForm<z.infer<typeof MaintenanceCategoryCreateFormSchema>>({
    resolver: zodResolver(MaintenanceCategoryCreateFormSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (
    values: z.infer<typeof MaintenanceCategoryCreateFormSchema>,
  ) => {
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    // ここからAPIでDB操作
    const response = await createMaintenanceCategory({
      name: values.name,
    });

    setSubmitResponse({
      message: response.message,
      status: response.success === true ? "success" : "error",
    });

    if (response.success === true) {
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
        ) : (
          ""
        )}

        <div className="flex justify-center md:justify-end">
          <SubmitButton
            variant="contained"
            isSubmitting={isSubmitting}
            isSubmitSuccessful={isSubmitSuccessful}
            labels={{
              default: "登録",
              isSubmitting: "送信中",
              isSubmitSuccessful: "送信完了",
            }}
          />
        </div>
      </div>
    </Box>
  );
}
