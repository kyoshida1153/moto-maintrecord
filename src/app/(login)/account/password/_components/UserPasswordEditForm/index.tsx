"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { Box, Button, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { Loading } from "@/components";
import { getUser, updateUser } from "@/lib/api";
import type { UserUniqueSelect } from "@/app/api/user/route";

type GetUserResponse = {
  status: "success" | "error" | undefined;
  message: string;
  defaultValue?: UserUniqueSelect;
};

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export default function UserPasswordEditForm() {
  // フォームの送信開始～終了で使うもの
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>({
    status: undefined,
    message: "",
  });

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
      const password = formData.get("new_password");

      const data = {
        password: password as string,
      };

      const updateUserResponse = await updateUser(data);
      setIsSubmitting(false);
      setSubmitResponse({
        message: updateUserResponse.message,
        status: updateUserResponse.success === true ? "success" : "error",
      });

      if (updateUserResponse.success === true) {
        setIsSubmitSuccessful(true);
        setTimeout(() => {
          signOut({ callbackUrl: "/login" });
        }, 3000);
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

  return (
    <>
      {isLoadingGetUser ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : getUserResponse.status === "success" ? (
        <Box
          component="form"
          className="mt-6 w-full md:mt-8"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4 md:gap-6">
            <TextField
              required
              id="current_password"
              label="現在のパスワード"
              type="password"
              name="current_password"
              disabled={isSubmitting || isSubmitSuccessful}
              sx={{ backgroundColor: "#fff" }}
            />
            <TextField
              required
              id="new_password"
              label="新しいパスワード"
              type="password"
              name="new_password"
              disabled={isSubmitting || isSubmitSuccessful}
              sx={{ backgroundColor: "#fff" }}
            />
            <TextField
              required
              id="new_password_confirm"
              label="新しいパスワード（確認）"
              type="password"
              name="new_password_confirm"
              disabled={isSubmitting || isSubmitSuccessful}
              sx={{ backgroundColor: "#fff" }}
            />
            <div className="mt-3 flex flex-col items-center justify-center gap-2 md:mt-4 md:flex-row md:justify-end">
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
            {submitResponse.status === "success" && (
              <p>
                3秒後ログアウトします。新しいパスワードで再度ログインしてください。
              </p>
            )}
          </div>
        </Box>
      ) : (
        <p>{getUserResponse.message}</p>
      )}
    </>
  );
}
