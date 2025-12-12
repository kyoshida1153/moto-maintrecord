"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { deleteMaintenanceRecord } from "@/lib/api";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export function useMaintenanceRecordDeleteForm() {
  /**
   * フォームの送信時の処理
   */
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);

  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>({
    status: undefined,
    message: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const id = formData.get("id");

    if (typeof id !== "string" || id === "") {
      setSubmitResponse({
        message: "送信できませんでした。",
        status: "error",
      });
      setTimeout(() => {
        setIsSubmitting(false);
      }, 300);
      return;
    }

    const response = await deleteMaintenanceRecord(id);
    setIsSubmitting(false);
    setSubmitResponse({
      message: response.message,
      status: response.success === true ? "success" : "error",
    });

    if (response.success === true) {
      setIsSubmitSuccessful(true);
      setTimeout(() => {
        // router.back();
        router.push("/record");
      }, 2000);
    }
  };

  /* ###################################################################### */

  return {
    handleSubmit,
    isSubmitting,
    isSubmitSuccessful,
    submitResponse,
  };
}
