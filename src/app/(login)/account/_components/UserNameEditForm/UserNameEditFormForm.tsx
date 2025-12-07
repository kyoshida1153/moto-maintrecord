import React, { useState } from "react";

import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { SubmitButton, TextField } from "@/components";
import { updateUserName } from "@/lib/api";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { UpdateUserNameSchema } from "@/validations";
import type * as z from "zod";

import { useSession } from "next-auth/react";
import { useHeaderStore } from "@/app/_components/Header/stores";
import { useUserNameEditFormStore } from "./stores";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export default function UserNameEditFormForm() {
  // フォームのデフォルト値
  const { getUserResponse } = useUserNameEditFormStore();
  const defaultValues = getUserResponse.result;

  // フォームの送信開始～終了で使うもの
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>({
    status: undefined,
    message: "",
  });

  const { update: updateSession } = useSession();
  const { getLoginUserResponse, setGetLoginUserResponse } = useHeaderStore();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm<z.infer<typeof UpdateUserNameSchema>>({
    resolver: zodResolver(UpdateUserNameSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
    },
    mode: "onChange",
  });

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

      setSubmitResponse({
        status: undefined,
        message: "",
      });

      setTimeout(() => {
        reset(undefined, { keepValues: true });
      }, 100);
    } else {
      setTimeout(() => {
        reset(undefined, { keepValues: true });
      }, 100);
    }
  };

  return (
    <>
      {getUserResponse.status === "success" ? (
        <Box
          component="form"
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-row flex-nowrap gap-2">
            <div className="w-full">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    required={true}
                    field={field}
                    label="ユーザー名"
                    type="text"
                    disabled={isSubmitting || isSubmitSuccessful}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    variant="standard"
                  />
                )}
              />
            </div>
            <div className="pt-2">
              <SubmitButton
                variant="contained"
                isSubmitting={isSubmitting}
                isSubmitSuccessful={isSubmitSuccessful}
                labels={{
                  default: "変更",
                  isSubmitting: "変更中",
                  isSubmitSuccessful: "変更",
                }}
              />
            </div>
          </div>

          {submitResponse.status === "success" ? (
            <p className="flex items-center gap-1 text-[var(--icon-color-success)]">
              <CheckCircleIcon />
              <span className="whitespace-pre-wrap">
                {submitResponse.message}
              </span>
            </p>
          ) : submitResponse.status === "error" ? (
            <p className="flex items-center gap-1 text-[var(--icon-color-error)]">
              <ErrorIcon />
              <span className="whitespace-pre-wrap">
                {submitResponse.message}
              </span>
            </p>
          ) : (
            ""
          )}
        </Box>
      ) : (
        <p>
          {getUserResponse.message
            ? getUserResponse.message
            : "読み込みに失敗しました。"}
        </p>
      )}
    </>
  );
}
