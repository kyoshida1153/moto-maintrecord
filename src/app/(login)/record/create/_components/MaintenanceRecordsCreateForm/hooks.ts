"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MaintenanceRecordCreateFormSchema } from "./validations";
import type * as z from "zod";

import { uploadMaintenanceRecordImageFiles } from "@/lib";
import { createMaintenanceRecord } from "@/lib/api";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export function useMaintenanceRecordCreateForm() {
  /**
   * フォームの初期設定
   */
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm<z.infer<typeof MaintenanceRecordCreateFormSchema>>({
    resolver: zodResolver(MaintenanceRecordCreateFormSchema),
    defaultValues: {
      bikeId: "",
      maintenanceCategoryId: "",
      calenderDate: new Date(new Date().setHours(0, 0, 0, 0)),
      isDone: false,
      title: "",
      cost: undefined,
      memo: undefined,
      mileage: undefined,
      imageFiles: undefined,
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

  const onSubmit = async (
    values: z.infer<typeof MaintenanceRecordCreateFormSchema>,
  ) => {
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    // ここから画像アップロード
    const uploadResponse =
      values.imageFiles && values.imageFiles.length > 0
        ? await uploadMaintenanceRecordImageFiles(values.imageFiles)
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
    const createMaintenanceRecordResponse = await createMaintenanceRecord({
      bikeId: values.bikeId,
      maintenanceCategoryId: values.maintenanceCategoryId,
      calenderDate: values.calenderDate,
      isDone: values.isDone,
      title: values.title,
      cost: values.cost,
      memo: values.memo,
      mileage: values.mileage,
      maintenanceRecordImageUrls: uploadResponse?.result ?? undefined,
    });

    setSubmitResponse({
      message: createMaintenanceRecordResponse.message,
      status:
        createMaintenanceRecordResponse.success === true ? "success" : "error",
    });

    if (createMaintenanceRecordResponse.success === true) {
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
