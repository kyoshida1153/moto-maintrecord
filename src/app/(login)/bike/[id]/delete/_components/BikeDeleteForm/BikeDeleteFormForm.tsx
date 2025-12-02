"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { deleteBike } from "@/lib/api";
import { useBikeDeleteFormStore } from "./stores";
import { LinkButton, SubmitButton } from "@/components";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export default function BikeDeleteFormForm({ bikeId }: { bikeId: string }) {
  const { getBikeResponse } = useBikeDeleteFormStore();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>({
    status: undefined,
    message: "",
  });
  const router = useRouter();

  // フォームの送信開始～終了
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    e.preventDefault();

    const response = await deleteBike(bikeId);
    setIsSubmitting(false);
    setSubmitResponse({
      message: response.message,
      status: response.success === true ? "success" : "error",
    });

    if (response.success === true) {
      setIsSubmitSuccessful(true);
      setTimeout(() => {
        router.back();
      }, 2000);
    }
  };

  return (
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
  );
}
