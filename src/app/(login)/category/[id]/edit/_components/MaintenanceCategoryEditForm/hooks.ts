"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MaintenanceCategoryEditFormSchema } from "./validations";
import type * as z from "zod";

import { useMaintenanceCategoryEditFormStore } from "./stores";
import { updateMaintenanceCategory } from "@/lib/api";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export function useMaintenanceCategoryCreateForm() {
  /**
   * フォームの初期設定
   */
  const { getMaintenanceCategoryResponse } =
    useMaintenanceCategoryEditFormStore();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm<z.infer<typeof MaintenanceCategoryEditFormSchema>>({
    resolver: zodResolver(MaintenanceCategoryEditFormSchema),
    defaultValues: {
      id: getMaintenanceCategoryResponse.result?.id ?? "",
      name: getMaintenanceCategoryResponse.result?.name ?? "",
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
    values: z.infer<typeof MaintenanceCategoryEditFormSchema>,
  ) => {
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    const maintenanceCategoryResponse = await updateMaintenanceCategory({
      id: values.id,
      data: { name: values.name },
    });

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
