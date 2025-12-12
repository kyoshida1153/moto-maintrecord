"use client";

import { useRouter } from "next/navigation";

import Image from "next/image";
import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { useBikeDeleteFormStore } from "./stores";
import { LinkButton, SubmitButton } from "@/components";
import { useBikeDeleteForm } from "./hooks";

export default function BikeDeleteFormForm() {
  const { handleSubmit, isSubmitting, isSubmitSuccessful, submitResponse } =
    useBikeDeleteForm();
  const { getBikeResponse } = useBikeDeleteFormStore();

  const router = useRouter();

  return (
    <>
      {getBikeResponse.status === "success" ? (
        <div className="mt-6 md:mt-8">
          <div className="flex flex-col gap-4 md:gap-6">
            <p>以下の所有バイクを削除しますか？</p>
            <div className="display rounded border border-solid border-[var(--border-color-gray)] bg-white p-6 md:p-8">
              <div className="flex flex-col gap-4 md:gap-6">
                <section className="flex flex-col items-center gap-1 md:gap-2">
                  <p className="mx-auto w-[160px] min-w-[160px]">
                    <Image
                      src={
                        getBikeResponse.result?.imageUrl
                          ? getBikeResponse.result?.imageUrl
                          : "/assets/img/bike-default.svg"
                      }
                      alt=""
                      width={320}
                      height={320}
                      className="aspect-square w-full rounded-full border border-gray-300 bg-white object-cover"
                    />
                  </p>
                  <p className="mx-auto text-xl md:text-2xl">
                    {getBikeResponse.result?.name}
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
                    value={getBikeResponse.result?.id}
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
          {getBikeResponse.message
            ? getBikeResponse.message
            : "読み込みに失敗しました。"}
        </p>
      )}
    </>
  );
}
