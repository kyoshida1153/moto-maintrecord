"use client";

import { useRouter } from "next/navigation";

import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { LinkButton, SubmitButton } from "@/components";
import { useMaintenanceCategoryDeleteForm } from "./hooks";
import { useMaintenanceRecordCategoryDeleteFormStore } from "./stores";

export default function MaintenanceCategoryDeleteFormForm() {
  const { handleSubmit, isSubmitting, isSubmitSuccessful, submitResponse } =
    useMaintenanceCategoryDeleteForm();
  const { getMaintenanceCategoryResponse } =
    useMaintenanceRecordCategoryDeleteFormStore();

  const router = useRouter();

  return (
    <>
      {getMaintenanceCategoryResponse.status === "success" ? (
        <div className="mt-6 md:mt-8">
          <div className="flex flex-col gap-4 md:gap-6">
            <p>以下のカテゴリーを削除しますか？</p>
            <div className="display rounded border border-solid border-[var(--border-color-gray)] bg-white p-6 md:p-8">
              <div className="flex flex-col gap-4 md:gap-6">
                <section className="flex w-full flex-col gap-1 md:gap-2">
                  <p className="text-center text-xl md:text-2xl">
                    {getMaintenanceCategoryResponse.result?.name}
                  </p>
                </section>

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
                  <></>
                )}

                <Box
                  component="form"
                  className="flex justify-center gap-3"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="hidden"
                    name="id"
                    value={getMaintenanceCategoryResponse.result?.id}
                  />
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
                      isSubmitting: "送信中",
                      isSubmitSuccessful: "送信完了",
                    }}
                  />
                </Box>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>
          {getMaintenanceCategoryResponse.message
            ? getMaintenanceCategoryResponse.message
            : "読み込みに失敗しました。"}
        </p>
      )}
    </>
  );
}
