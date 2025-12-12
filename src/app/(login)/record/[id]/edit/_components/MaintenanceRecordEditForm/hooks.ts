"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MaintenanceRecordEditFormSchema } from "./validations";
import type * as z from "zod";

import { uploadMaintenanceRecordImageFiles } from "@/lib";
import { updateMaintenanceRecord } from "@/lib/api";

import { useMaintenanceRecordEditFormState } from "./stores";
import { useInputFileImageStore } from "@/components/InputFileImage/stores";

type SubmitResponse = {
  status: "success" | "error" | "info" | undefined;
  message: string;
};

export function useMaintenanceRecordEditForm() {
  /**
   * フォームの初期設定
   */
  const { getMaintenanceRecordResponse } = useMaintenanceRecordEditFormState();
  const maintenanceRecord = getMaintenanceRecordResponse.result;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm<z.infer<typeof MaintenanceRecordEditFormSchema>>({
    resolver: zodResolver(MaintenanceRecordEditFormSchema),
    defaultValues: {
      id: maintenanceRecord?.id ?? "",
      bikeId: maintenanceRecord?.bike?.id ?? "",
      maintenanceCategoryId: maintenanceRecord?.maintenanceCategory?.id ?? "",
      calenderDate: maintenanceRecord?.calenderDate
        ? new Date(maintenanceRecord.calenderDate)
        : undefined,
      isDone: maintenanceRecord?.isDone ?? false,
      title: maintenanceRecord?.title ?? "",
      cost: maintenanceRecord?.cost ?? undefined,
      memo: maintenanceRecord?.memo ?? undefined,
      mileage: maintenanceRecord?.mileage ?? undefined,
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

  const { isChangedInputFileImage } = useInputFileImageStore();

  const router = useRouter();

  const onSubmit = async (
    values: z.infer<typeof MaintenanceRecordEditFormSchema>,
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

    // if (isChangedInputFileImage === false) {
    //   setSubmitResponse({
    //     message: "画像の更新無し。",
    //     status: "info",
    //   });
    // }

    // ここからAPIでDB操作
    const data = {
      bikeId: values.bikeId,
      maintenanceCategoryId: values.maintenanceCategoryId,
      calenderDate: values.calenderDate,
      isDone: values.isDone,
      title: values.title,
      cost: values.cost,
      memo: values.memo,
      mileage: values.mileage,
    };

    if (
      // 別の画像に変更した場合
      uploadResponse &&
      uploadResponse.success === true
    ) {
      Object.assign(data, {
        maintenanceRecordImageUrls: uploadResponse.result,
      });
    } else if (
      // 画像を無しにした場合
      isChangedInputFileImage === true &&
      Array.isArray(values.imageFiles) &&
      values.imageFiles.length === 0
    ) {
      Object.assign(data, { maintenanceRecordImageUrls: null });
    }

    const updateMaintenanceRecordResponse = await updateMaintenanceRecord({
      id: values.id,
      data,
    });

    setSubmitResponse({
      message: updateMaintenanceRecordResponse.message,
      status:
        updateMaintenanceRecordResponse.success === true ? "success" : "error",
    });

    if (updateMaintenanceRecordResponse.success === true) {
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
