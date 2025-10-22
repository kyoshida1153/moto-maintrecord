"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputFileImage from "@/components/InputFileImage";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Loading from "@/components/Loading";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { Prisma } from "@prisma/client";
import { uploadImage } from "./actions";

export type Bike = Prisma.BikeGetPayload<{
  select: {
    name: true;
    mileage: true;
    memo: true;
    imageUrl: true;
  };
}>;

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

async function createBike(data: Bike): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/bike/`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (response?.status === 201) {
    return {
      success: true,
      message: "所有バイクの登録に成功しました。",
    };
  } else {
    return {
      success: false,
      message: "所有バイクの登録に失敗しました。",
    };
  }
}

export default function BikeCreateForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>({
    status: undefined,
    message: "",
  });
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    const formData = new FormData(e.currentTarget);

    // 画像アップロード
    const imageFile = formData.get("imageFile");

    if (!(imageFile instanceof File)) {
      setIsSubmitting(false);
      setSubmitResponse({
        message: "画像のアップロードに失敗しました。",
        status: "error",
      });
      return;
    }

    const uploadResponse = await uploadImage(imageFile);
    setSubmitResponse({
      message: uploadResponse.message,
      status: uploadResponse.success === true ? "success" : "error",
    });

    if (uploadResponse.success === false) {
      setIsSubmitting(false);
      return;
    }

    // APIでDB操作
    const data = {
      name: formData.get("name") as string,
      mileage: Number(formData.get("mileage")),
      memo: formData.get("memo") as string,
      imageUrl: uploadResponse.imageUrl as string,
    };

    const bikeResponse = await createBike(data);
    setIsSubmitting(false);
    setSubmitResponse({
      message: bikeResponse.message,
      status: bikeResponse.success === true ? "success" : "error",
    });

    if (bikeResponse.success === true) {
      setIsSubmitSuccessful(true);
      setTimeout(() => {
        router.push("/bike");
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <Box component="form" className="mt-6 md:mt-8" onSubmit={onSubmit}>
        <div className="flex flex-col gap-4 md:gap-6">
          <InputFileImage
            name="imageFile"
            multiple={false}
            label="バイクの写真"
            maxFileCount={3}
          />
          <TextField
            required
            id="name"
            label="バイクの名前"
            type="text"
            name="name"
            sx={{ backgroundColor: "#fff" }}
            disabled={isSubmitting || isSubmitSuccessful}
          />
          <TextField
            id="mileage_km"
            label="毎月の走行距離（km）"
            type="number"
            name="mileage"
            sx={{ backgroundColor: "#fff" }}
            disabled={isSubmitting || isSubmitSuccessful}
          />
          <TextField
            id="memo"
            label="メモ"
            multiline
            rows={6}
            name="memo"
            defaultValue=""
            sx={{ backgroundColor: "#fff" }}
            disabled={isSubmitting || isSubmitSuccessful}
          />
          <div className="mt-3 flex flex-col items-center justify-center gap-2 md:mt-4 md:flex-row md:justify-end">
            {submitResponse.status === "success" && (
              <p className="flex items-center gap-1 text-[var(--icon-color-success)]">
                <CheckCircleIcon />
                <span className="whitespace-pre-wrap">
                  {submitResponse.message}
                </span>
              </p>
            )}
            {submitResponse.status === "error" && (
              <p className="flex items-center gap-1 text-[var(--icon-color-error)]">
                <ErrorIcon />
                <span className="whitespace-pre-wrap">
                  {submitResponse.message}
                </span>
              </p>
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
              {isSubmitSuccessful ? <>登録済</> : ""}
              {!isSubmitting && !isSubmitSuccessful ? <>登録</> : ""}
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
}
