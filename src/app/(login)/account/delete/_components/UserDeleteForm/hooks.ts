"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { deleteUser } from "@/lib/api";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export function useUserDeleteForm() {
  /**
   * フォームの送信時の処理
   */
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);

  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>({
    status: undefined,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    try {
      const deleteUserResponse = await deleteUser();
      setIsSubmitting(false);
      setSubmitResponse({
        message: deleteUserResponse.message,
        status: deleteUserResponse.success === true ? "success" : "error",
      });

      if (deleteUserResponse.success === true) {
        setIsSubmitSuccessful(true);
        setTimeout(() => {
          signOut({ callbackUrl: "/" });
        }, 2000);
      }
    } catch {
      setIsSubmitting(false);
      setSubmitResponse({
        message: "変更に失敗しました。",
        status: "error",
      });
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
