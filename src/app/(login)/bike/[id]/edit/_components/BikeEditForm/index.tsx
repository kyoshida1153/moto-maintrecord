"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

import { Loading, InputFileImage } from "@/components";
import { getBike, updateBike } from "@/lib/api";
import { uploadBikeImageFile } from "@/lib";
import type { BikeUniqueSelect } from "@/app/api/bikes/[id]/route";

type GetBikeResponse = {
  status: "success" | "error" | undefined;
  message: string;
  defaultValue?: BikeUniqueSelect;
};

type SubmitResponse = {
  status: "success" | "error" | "info" | undefined;
  message: string;
};

export default function BikeEditForm({ bikeId }: { bikeId: string }) {
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
      const formData = new FormData(e.currentTarget);

      // ここから画像アップロード
      const imageFile = formData.get("imageFile");

      if (!(imageFile instanceof File)) {
        setIsSubmitting(false);
        setSubmitResponse({
          message: "画像のアップロードに失敗しました。",
          status: "error",
        });
        return;
      }

      const uploadResponse =
        formData.get("isChangedInputFileImage_imageFile") &&
        (await uploadBikeImageFile(imageFile));

      if (uploadResponse) {
        setSubmitResponse({
          message: uploadResponse.message,
          status: uploadResponse.success === true ? "success" : "error",
        });
        if (uploadResponse.success === false) {
          setIsSubmitting(false);
          return;
        }
      } else {
        setSubmitResponse({
          message: "画像の更新無し。",
          status: "info",
        });
      }

      // ここからAPIでDB操作
      const name = formData.get("name");
      const mileage = formData.get("mileage");
      const memo = formData.get("memo");

      const data = {
        name: name as string,
        mileage: mileage ? Number(mileage) : null,
        memo: memo ? (memo as string) : null,
      };
      if (uploadResponse && uploadResponse.success === true) {
        Object.assign(data, { imageUrl: uploadResponse.imageUrl });
      }

      const bikeResponse = await updateBike(data, bikeId);
      setIsSubmitting(false);
      setSubmitResponse({
        message: bikeResponse.message,
        status: bikeResponse.success === true ? "success" : "error",
      });

      if (bikeResponse.success === true) {
        setIsSubmitSuccessful(true);
        setTimeout(() => {
          router.back();
        }, 2000);
      }
    } catch {
      setIsSubmitting(false);
      setSubmitResponse({
        message: "送信に失敗しました。",
        status: "error",
      });
    }
  };

  // フォームのdefaultValueの設定で使うもの
  const [isLoadingGetBike, setIsLoadingGetBike] = useState<boolean>(true);
  const [getBikeResponse, setGetBikeResponse] = useState<GetBikeResponse>({
    status: undefined,
    message: "",
  });

  // フォームのdefaultValueに設定するデータの読み込み
  useEffect(() => {
    (async () => {
      setIsLoadingGetBike(true);
      const response = await getBike(bikeId);
      setGetBikeResponse({
        message: response.message,
        status: response.success === true ? "success" : "error",
        defaultValue: response.result,
      });
      setIsLoadingGetBike(false);
    })();
  }, [bikeId]);

  return (
    <>
      {isLoadingGetBike ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : getBikeResponse.status === "success" ? (
        <Box component="form" className="mt-6 md:mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 md:gap-6">
            <InputFileImage
              name="imageFile"
              label="バイクの写真"
              multiple={false}
              defaultValue={
                getBikeResponse.defaultValue?.imageUrl
                  ? [{ imageUrl: getBikeResponse.defaultValue?.imageUrl }]
                  : undefined
              }
              disabled={isSubmitting || isSubmitSuccessful}
            />
            <TextField
              required
              id="name"
              label="バイクの名前"
              type="text"
              name="name"
              defaultValue={getBikeResponse.defaultValue?.name}
              disabled={isSubmitting || isSubmitSuccessful}
              sx={{ backgroundColor: "#fff" }}
            />
            <TextField
              id="mileage"
              label="毎月の走行距離（km）"
              type="number"
              name="mileage"
              defaultValue={getBikeResponse.defaultValue?.mileage}
              disabled={isSubmitting || isSubmitSuccessful}
              sx={{ backgroundColor: "#fff" }}
            />
            <TextField
              id="memo"
              label="メモ"
              multiline
              rows={6}
              name="memo"
              defaultValue={getBikeResponse.defaultValue?.memo}
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
              ) : submitResponse.status === "info" ? (
                <p className="flex items-center gap-1 text-[var(--icon-color-info)]">
                  <InfoIcon />
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
                {isSubmitting ? <>送信中</> : ""}
                {isSubmitSuccessful ? <>編集済</> : ""}
                {!isSubmitting && !isSubmitSuccessful ? <>編集</> : ""}
              </Button>
            </div>
          </div>
        </Box>
      ) : (
        <p>{getBikeResponse.message}</p>
      )}
    </>
  );
}
