"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

import { InputFileImage, TextField, SubmitButton } from "@/components";
import { useInputFileImageStore } from "@/components/InputFileImage/stores";
import { uploadBikeImageFile } from "@/lib";
import { updateBike } from "@/lib/api";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { BikeUpdateFormSchema } from "./validations";
import type * as z from "zod";
import { useBikeEditFormStore } from "./stores";

type SubmitResponse = {
  status: "success" | "error" | "info" | undefined;
  message: string;
};

export default function BikeEditFormForm() {
  const params = useParams<{ id: string }>();
  const bikeId = params.id;

  // フォームのデフォルト値
  const { getBikeResponse } = useBikeEditFormStore();
  const defaultValues = getBikeResponse.result;

  // フォームの送信開始～終了で使うもの
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>({
    status: undefined,
    message: "",
  });
  const { isChangedInputFileImage } = useInputFileImageStore();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm<z.infer<typeof BikeUpdateFormSchema>>({
    resolver: zodResolver(BikeUpdateFormSchema),
    defaultValues: {
      imageFile: undefined,
      name: defaultValues?.name ?? "",
      mileage: defaultValues?.mileage ?? undefined,
      memo: defaultValues?.memo ?? undefined,
    },
    mode: "onChange",
  });

  // フォームの送信開始～終了
  const onSubmit = async (values: z.infer<typeof BikeUpdateFormSchema>) => {
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    // ここから画像アップロード
    const uploadResponse =
      isChangedInputFileImage === true &&
      values.imageFile &&
      values.imageFile.length > 0
        ? await uploadBikeImageFile(values.imageFile)
        : undefined;

    if (uploadResponse) {
      setSubmitResponse({
        message: uploadResponse.message,
        status: uploadResponse.success === true ? "success" : "error",
      });
      if (uploadResponse.success === false) {
        setTimeout(() => {
          reset(undefined, { keepValues: true });
        }, 300);
        return;
      }
    }

    if (isChangedInputFileImage === false) {
      setSubmitResponse({
        message: "画像の更新無し。",
        status: "info",
      });
    }

    // ここからAPIでDB操作
    const data = {
      name: values.name,
      mileage: values.mileage,
      memo: values.memo,
    };

    if (
      // 別の画像に変更した場合
      uploadResponse &&
      uploadResponse.success === true
    ) {
      Object.assign(data, { imageUrl: uploadResponse.imageUrl });
    } else if (
      // 画像を無しにした場合
      isChangedInputFileImage === true &&
      values.imageFile &&
      values.imageFile.length === 0
    ) {
      Object.assign(data, { imageUrl: null });
    }

    const bikeResponse = await updateBike({ id: bikeId, data });

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
              defaultValue={
                defaultValues?.imageUrl
                  ? [{ imageUrl: defaultValues?.imageUrl }]
                  : undefined
              }
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
              type="text"
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
  );
}
