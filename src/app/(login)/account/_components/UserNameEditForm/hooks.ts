"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UpdateUserNameSchema } from "@/validations";
import type * as z from "zod";

import { useSession } from "next-auth/react";
import { useHeaderStore } from "@/app/_components/Header/stores";
import { useUserNameEditFormStore } from "./stores";

import { updateUserName } from "@/lib/api";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export function useUserNameEditForm() {
  /**
   * フォームの初期設定
   */
  const { getUserResponse } = useUserNameEditFormStore();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm<z.infer<typeof UpdateUserNameSchema>>({
    resolver: zodResolver(UpdateUserNameSchema),
    defaultValues: {
      name: getUserResponse.result?.name ?? "",
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

  const { update: updateSession } = useSession();
  const { getLoginUserResponse, setGetLoginUserResponse } = useHeaderStore();

  // フォームの送信開始～終了
  const onSubmit = async (values: z.infer<typeof UpdateUserNameSchema>) => {
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    const data = {
      name: values.name,
    };

    const updateResponse = await updateUserName(data);

    setSubmitResponse({
      message: updateResponse.message,
      status: updateResponse.success === true ? "success" : "error",
    });

    if (updateResponse.success === true) {
      // セッションを更新
      await updateSession(data);

      // ヘッダーのユーザー名を更新
      setGetLoginUserResponse({
        status: "success",
        message: "更新に成功しました。",
        result: {
          ...data,
          image: getLoginUserResponse.result?.image,
        },
      });

      setTimeout(() => {
        setSubmitResponse({
          status: undefined,
          message: "",
        });

        reset(undefined, { keepValues: true });
      }, 1000);
    } else {
      setTimeout(() => {
        setSubmitResponse({
          status: undefined,
          message: "",
        });

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
