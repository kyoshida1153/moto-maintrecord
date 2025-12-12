"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateUserSchema } from "@/validations";
import type * as z from "zod";

import { createUser } from "@/lib/api";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export function useSignupForm() {
  /**
   * フォームの初期設定
   */
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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

  const onSubmit = async (values: z.infer<typeof CreateUserSchema>) => {
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    // ユーザー作成
    const createUserResponse = await createUser({
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });

    setSubmitResponse({
      message: createUserResponse.message,
      status: createUserResponse.success === true ? "success" : "error",
    });

    if (createUserResponse.success === false) {
      setTimeout(() => {
        reset(undefined, { keepValues: true });
      }, 300);
      return false;
    }

    // ログイン
    const loginResponse = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (loginResponse?.ok && !!loginResponse?.error === false) {
      setSubmitResponse({
        message: "ログインに成功しました。",
        status: "success",
      });
      setTimeout(() => {
        router.push("/top");
      }, 1500);
    } else {
      setSubmitResponse({
        message:
          "ログインに失敗しました。\nお手数ですがログイン画面でログインしてください。\n3秒後にログイン画面に移動します。",
        status: "error",
      });
      setTimeout(() => {
        router.push("/login");
      }, 3000);
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
