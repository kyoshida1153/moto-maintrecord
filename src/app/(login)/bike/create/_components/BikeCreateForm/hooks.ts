"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BikeCreateFormSchema } from "./validations";
import type * as z from "zod";

import { uploadBikeImageFile } from "@/lib";
import { createBike } from "@/lib/api";

type SubmitResponse = {
  status: "success" | "error" | "info" | undefined;
  message: string;
};

export function useBikeCreateForm() {
  /**
   * フォームの初期設定
   */
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

  /* ###################################################################### */

  /**
   * フォームの送信時の処理
   */
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>({
    status: undefined,
    message: "",
  });

  const router = useRouter();

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
      imageUrl: uploadResponse?.result ?? undefined,
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

  /* ###################################################################### */

  return {
    control,
    handleSubmit,
    isSubmitting,
    isSubmitSuccessful,
    errors,
    submitResponse,
    onSubmit,
  };
}
