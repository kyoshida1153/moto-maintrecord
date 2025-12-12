"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UpdateUserPasswordSchema } from "@/validations";
import type * as z from "zod";

import { updateUserPassword } from "@/lib/api";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export function useUserPasswordEditForm() {
  /**
   * フォームの初期設定
   */
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm<z.infer<typeof UpdateUserPasswordSchema>>({
    resolver: zodResolver(UpdateUserPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
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

  const onSubmit = async (values: z.infer<typeof UpdateUserPasswordSchema>) => {
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    // ここからAPIでDB操作
    const updateUserResponse = await updateUserPassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      confirmNewPassword: values.confirmNewPassword,
    });

    setSubmitResponse({
      message: updateUserResponse.message,
      status: updateUserResponse.success === true ? "success" : "error",
    });

    if (updateUserResponse.success === true) {
      setTimeout(() => {
        signOut({ callbackUrl: "/login" });
      }, 3000);
    } else {
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
