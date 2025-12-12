"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BikeUpdateFormSchema } from "./validations";
import type * as z from "zod";

import { useBikeEditFormStore } from "./stores";
import { useInputFileImageStore } from "@/components/InputFileImage/stores";
import { updateBike } from "@/lib/api";
import { uploadBikeImageFile } from "@/lib";

type SubmitResponse = {
  status: "success" | "error" | "info" | undefined;
  message: string;
};

export function useBikeCreateForm() {
  /**
   * フォームの初期設定
   */
  const { getBikeResponse } = useBikeEditFormStore();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm<z.infer<typeof BikeUpdateFormSchema>>({
    resolver: zodResolver(BikeUpdateFormSchema),
    defaultValues: {
      id: getBikeResponse.result?.id ?? "",
      imageFile: undefined,
      name: getBikeResponse.result?.name ?? "",
      mileage: getBikeResponse.result?.mileage ?? undefined,
      memo: getBikeResponse.result?.memo ?? undefined,
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
  const { isChangedInputFileImage } = useInputFileImageStore();
  const router = useRouter();

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

    // if (isChangedInputFileImage === false) {
    //   setSubmitResponse({
    //     message: "画像の更新無し。",
    //     status: "info",
    //   });
    // }

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
      Object.assign(data, { imageUrl: uploadResponse.result });
    } else if (
      // 画像を無しにした場合
      isChangedInputFileImage === true &&
      values.imageFile &&
      values.imageFile.length === 0
    ) {
      Object.assign(data, { imageUrl: null });
    }

    const bikeResponse = await updateBike({ id: values.id, data });

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
