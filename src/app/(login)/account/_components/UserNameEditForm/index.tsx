"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { Loading, SubmitButton, TextField } from "@/components";
import { getUser, updateUserName } from "@/lib/api";
import type { UserUniqueSelect } from "@/app/api/user/route";

import { useSession } from "next-auth/react";
import useHeaderStore from "@/app/_components/Header/store";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { UserNameSchema } from "@/validations";
import type * as z from "zod";

type GetUserResponse = {
  status: "success" | "error" | undefined;
  message: string;
  defaultValue?: UserUniqueSelect;
};

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export default function UserNameEditForm() {
  // フォームのdefaultValueの設定で使うもの
  const [isLoadingGetUser, setIsLoadingGetUser] = useState<boolean>(true);
  const [getUserResponse, setGetUserResponse] = useState<GetUserResponse>({
    status: undefined,
    message: "",
  });

  // フォームのdefaultValueに設定するデータの読み込み
  useEffect(() => {
    (async () => {
      setIsLoadingGetUser(true);
      const response = await getUser();
      setGetUserResponse({
        message: response.message,
        status: response.success === true ? "success" : "error",
        defaultValue: response.result,
      });
      setIsLoadingGetUser(false);
    })();
  }, []);

  // フォームの送信開始～終了で使うもの
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>({
    status: undefined,
    message: "",
  });
  const { update } = useSession();
  const { getLoginUserResponse, setGetLoginUserResponse } = useHeaderStore();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm<z.infer<typeof UserNameSchema>>({
    resolver: zodResolver(UserNameSchema),
    mode: "onChange",
  });

  // フォームの送信開始～終了
  const onSubmit = async (values: z.infer<typeof UserNameSchema>) => {
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
      await update(data);

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
        reset(undefined, { keepValues: true });
        setSubmitResponse({
          status: undefined,
          message: "",
        });
      }, 1000);
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

  return (
    <>
      {isLoadingGetUser ? (
        <div className="flex w-full max-w-lg justify-center py-2">
          <Loading size="24px" />
        </div>
      ) : getUserResponse.status === "success" ? (
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
                    variant="standard"
                    field={field}
                    label="ユーザー名"
                    type="text"
                    defaultValue={getUserResponse?.defaultValue?.name ?? ""}
                    disabled={isSubmitting || isSubmitSuccessful}
                    error={!!errors.name}
                    helperText={errors.name?.message}
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
                  isSubmitSuccessful: "変更済",
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
        <p>{getUserResponse.message}</p>
      )}
    </>
  );
}
