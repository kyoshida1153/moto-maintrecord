"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UpdateUserEmailSchema } from "@/validations";
import type * as z from "zod";

import { updateUserEmail } from "@/lib/api";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export function useUserEmailEditForm() {
  /**
   * フォームの初期設定
   */

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm<z.infer<typeof UpdateUserEmailSchema>>({
    resolver: zodResolver(UpdateUserEmailSchema),
    defaultValues: {
      currentEmail: "",
      newEmail: "",
      confirmNewEmail: "",
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

  // フォームの送信開始～終了
  const onSubmit = async (values: z.infer<typeof UpdateUserEmailSchema>) => {
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    // ここからAPIでDB操作
    const updateResponse = await updateUserEmail({
      currentEmail: values.currentEmail,
      newEmail: values.newEmail,
      confirmNewEmail: values.confirmNewEmail,
    });

    setSubmitResponse({
      message: updateResponse.message,
      status: updateResponse.success === true ? "success" : "error",
    });

    if (updateResponse.success === true) {
      setTimeout(() => {
        signOut({ callbackUrl: "/login" });
      }, 3000);
    } else {
      setSubmitResponse({
        message: updateResponse.message,
        status: "error",
      });

      setTimeout(() => {
        reset(undefined, { keepValues: true });
      }, 300);
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
