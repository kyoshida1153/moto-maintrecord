"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { TextField, SubmitButton, InputFileImage } from "@/components";
import { uploadBikeImageFile } from "@/lib";
import { createBike } from "@/lib/api";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { BikeCreateFormSchema } from "./validations";
import type * as z from "zod";

type SubmitResponse = {
  status: "success" | "error" | "info" | undefined;
  message: string;
};

export default function BikeCreateForm() {
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
  } = useForm<z.infer<typeof BikeCreateFormSchema>>({
    resolver: zodResolver(BikeCreateFormSchema),
    defaultValues: {
      imageFile: undefined,
      name: "",
      mileage: undefined,
      memo: "",
    },
    mode: "onChange",
  });

  // フォームの送信開始～終了
  const onSubmit = async (values: z.infer<typeof BikeCreateFormSchema>) => {
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    // ここから画像アップロード
    const uploadResponse =
      values.imageFile && values.imageFile.length > 0
        ? await uploadBikeImageFile(values.imageFile)
        : undefined;

    if (uploadResponse) {
      setSubmitResponse({
        message: uploadResponse.message,
        status: uploadResponse.success === true ? "success" : "error",
      });
      if (uploadResponse?.success === false) {
        setTimeout(() => {
          reset(undefined, { keepValues: true });
        }, 300);
        return;
      }
    }

    // ここからAPIでDB操作
    const bikeResponse = await createBike({
      name: values.name,
      mileage: values.mileage,
      memo: values.memo,
      imageUrl: uploadResponse?.imageUrl ?? undefined,
    });

    setSubmitResponse({
      message: bikeResponse.message,
      status: bikeResponse.success === true ? "success" : "error",
    });

    if (bikeResponse.success === true) {
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
          name="imageFile"
          control={control}
          render={({ field }) => (
            <InputFileImage
              multiple={false}
              label="バイクの写真"
              disabled={isSubmitting || isSubmitSuccessful}
              field={field}
              fieldError={errors.imageFile}
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
              label="バイクの名前"
              type="text"
              disabled={isSubmitting || isSubmitSuccessful}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="mileage"
          control={control}
          render={({ field }) => (
            <TextField
              field={field}
              label="毎月の走行距離（km）"
              type="number"
              disabled={isSubmitting || isSubmitSuccessful}
              error={!!errors.mileage}
              helperText={errors.mileage?.message}
              width="200px"
            />
          )}
        />
        <Controller
          name="memo"
          control={control}
          render={({ field }) => (
            <TextField
              field={field}
              label="メモ"
              multiline={true}
              type="text"
              disabled={isSubmitting || isSubmitSuccessful}
              error={!!errors.memo}
              helperText={errors.memo?.message}
              rows={5}
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
