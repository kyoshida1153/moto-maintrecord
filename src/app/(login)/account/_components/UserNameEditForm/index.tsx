"use client";

import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { Loading } from "@/components";
import { getUser, updateUser } from "@/lib/api";
import type { UserUniqueSelect } from "@/app/api/user/route";

import { useSession } from "next-auth/react";
import useHeaderStore from "@/app/_components/Header/store";

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
  // フォームの送信開始～終了で使うもの
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>({
    status: undefined,
    message: "",
  });
  const { update } = useSession();
  const { getLoginUserResponse, setGetLoginUserResponse } = useHeaderStore();

  // フォームの送信開始～終了
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    try {
      const formData = new FormData(e.currentTarget);

      // ここからAPIでDB操作
      const name = formData.get("name");

      const data = {
        name: name as string,
      };

      const updateUserResponse = await updateUser(data);
      setIsSubmitting(false);
      setSubmitResponse({
        message: updateUserResponse.message,
        status: updateUserResponse.success === true ? "success" : "error",
      });

      if (updateUserResponse.success === true) {
        // セッションを更新
        await update({ name });

        // ヘッダーのユーザー名を更新
        setGetLoginUserResponse({
          status: "success",
          message: "更新に成功しました。",
          result: {
            name: name as string,
            image: getLoginUserResponse.result?.image,
          },
        });

        setIsSubmitSuccessful(true);
        setTimeout(() => {
          setIsSubmitting(false);
          setIsSubmitSuccessful(false);
          setSubmitResponse({
            status: undefined,
            message: "",
          });
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

  // フォームのdefaultValueの設定で使うもの
  const [isLoadingGetUser, setIsLoadingGetUser] = useState(true);
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
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row flex-nowrap gap-2">
            <div className="w-full">
              <TextField
                required
                variant="standard"
                id="name"
                label="ユーザー名"
                type="text"
                name="name"
                defaultValue={getUserResponse.defaultValue?.name}
                disabled={isSubmitting || isSubmitSuccessful}
                sx={{ backgroundColor: "#fff", width: "100%" }}
              />
            </div>
            <div className="self-end">
              <Button
                variant="contained"
                disableElevation
                type="submit"
                sx={{
                  fontSize: "16px",
                  px: "1.5em",
                  display: "flex",
                  gap: "0.25em",
                  whiteSpace: "nowrap",
                }}
                disabled={isSubmitting || isSubmitSuccessful}
              >
                {isSubmitting ? <Loading size="18px" /> : ""}
                {isSubmitting ? <>変更中</> : ""}
                {isSubmitSuccessful ? <>変更済</> : ""}
                {!isSubmitting && !isSubmitSuccessful ? <>変更</> : ""}
              </Button>
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
