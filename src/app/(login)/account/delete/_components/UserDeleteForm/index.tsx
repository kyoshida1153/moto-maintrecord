"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";

import Loading from "@/components/Loading";
import getUser from "@/lib/api/getUser";
import deleteUser from "@/lib/api/deleteUser";
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

export default function AccountDeleteForm() {
  // フォームの送信開始～終了で使うもの
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>({
    status: undefined,
    message: "",
  });
  const router = useRouter();

  // フォームの送信開始～終了
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
        // signOut({ callbackUrl: "/" });
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

  // 削除対象のユーザー名の表示で使うもの
  const [isLoadingGetUser, setIsLoadingGetUser] = useState<boolean>(true);
  const [getUserResponse, setGetUserResponse] = useState<GetUserResponse>({
    status: undefined,
    message: "",
  });

  // 削除対象のユーザー名の読み込み
  useEffect(() => {
    (async () => {
      setIsLoadingGetUser(true);
      const response = await getUser();
      setGetUserResponse({
        status: response.success === true ? "success" : "error",
        message: response.message,
        defaultValue: response.result,
      });
      setIsLoadingGetUser(false);
    })();
  }, []);

  return (
    <>
      {isLoadingGetUser ? (
        <div className="flex w-full max-w-lg justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : getUserResponse.status === "success" ? (
        <Box component="form" className="mt-6 md:mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex max-w-md items-center gap-2">
              <WarningIcon sx={{ fontSize: "42px", textAlign: "middle" }} />
              <p>
                アカウントの削除を行うと、登録した内容がすべて削除されます。
              </p>
            </div>
            <div className="flex justify-center md:justify-start">
              <p className="text-md my-4 text-center font-[500] md:text-left">
                <span className="text-xl">
                  {getUserResponse.defaultValue?.name}
                </span>{" "}
                さん
                <br />
                {submitResponse.status === "success" ? (
                  <span className="text-xl">
                    ご利用ありがとうございました。
                  </span>
                ) : (
                  <>のアカウントを削除しますか？</>
                )}
              </p>
            </div>

            {submitResponse.status === "success" ? (
              <div className="flex justify-center md:justify-start">
                <p className="flex items-center gap-1 text-[var(--icon-color-success)]">
                  <CheckCircleIcon />
                  <span className="whitespace-pre-wrap">
                    {submitResponse.message}
                  </span>
                </p>
              </div>
            ) : submitResponse.status === "error" ? (
              <div className="flex justify-center md:justify-start">
                <p className="flex items-center gap-1 text-[var(--icon-color-error)]">
                  <ErrorIcon />
                  <span className="whitespace-pre-wrap">
                    {submitResponse.message}
                  </span>
                </p>
              </div>
            ) : (
              ""
            )}

            <div className="flex justify-center gap-3 md:justify-start">
              <Button
                variant="outlined"
                disableElevation
                sx={{
                  backgroundColor: "#fff",
                  maxWidth: "fit-content",
                  px: "1.5em",
                  fontSize: "16px",
                  whiteSpace: "nowrap",
                }}
                disabled={isSubmitting || isSubmitSuccessful}
                onClick={router.back}
              >
                キャンセル
              </Button>
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
                {isSubmitting ? <>削除中</> : ""}
                {isSubmitSuccessful ? <>削除済</> : ""}
                {!isSubmitting && !isSubmitSuccessful ? <>削除</> : ""}
              </Button>
            </div>
          </div>
        </Box>
      ) : (
        <p>{getUserResponse.message}</p>
      )}
    </>
  );
}
