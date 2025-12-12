"use client";

import { useRouter } from "next/navigation";

import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";

import { LinkButton, Loading, SubmitButton } from "@/components";
import { useUserDeleteFormStore } from "./stores";
import { useUserDeleteForm } from "./hooks";

export default function UserDeleteForm() {
  const { handleSubmit, isSubmitting, isSubmitSuccessful, submitResponse } =
    useUserDeleteForm();
  const { getUserResponse, isLoadingUserDeleteForm } = useUserDeleteFormStore();

  const router = useRouter();

  return (
    <>
      {isLoadingUserDeleteForm ? (
        <div className="w-ful flex justify-center py-4">
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
              <LinkButton
                href="#"
                variant="outlined"
                disabled={isSubmitting || isSubmitSuccessful}
                onClick={router.back}
              >
                キャンセル
              </LinkButton>
              <SubmitButton
                variant="contained"
                isSubmitting={isSubmitting}
                isSubmitSuccessful={isSubmitSuccessful}
                labels={{
                  default: "削除",
                  isSubmitting: "削除中",
                  isSubmitSuccessful: "削除完了",
                }}
              />
            </div>
          </div>
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
