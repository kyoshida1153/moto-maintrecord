"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormSchema } from "./validations";
import type * as z from "zod";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export function useLoginForm() {
  /**
   * フォームの初期設定
   */
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
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

  const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (response?.ok && !!response?.error === false) {
      setSubmitResponse({
        message: "ログインに成功しました。",
        status: "success",
      });
      setTimeout(() => {
        router.push("/top");
      }, 1500);
    } else {
      setSubmitResponse({
        message: "ログインに失敗しました。",
        status: "error",
      });
      setTimeout(() => {
        reset(undefined, { keepValues: true });
        return;
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
