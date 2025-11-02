"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Loading from "@/components/Loading";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import createMaintenanceCategory from "./createMaintenanceCategory";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export default function MaintenanceCategoryCreateForm() {
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

    // APIでDB操作
    const name = formData.get("name");

    const data = {
      name: name as string,
    };

    const response = await createMaintenanceCategory(data);
    setIsSubmitting(false);
    setSubmitResponse({
      message: response.message,
      status: response.success === true ? "success" : "error",
    });

    if (response.success === true) {
      setIsSubmitSuccessful(true);
      setTimeout(() => {
        router.push("/category");
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <Box component="form" className="mt-6 md:mt-8" onSubmit={onSubmit}>
        <div className="flex flex-col gap-4 md:gap-6">
          <TextField
            required
            id="name"
            label="カテゴリー名"
            type="text"
            name="name"
            sx={{ backgroundColor: "#fff" }}
            disabled={isSubmitting || isSubmitSuccessful}
          />
          <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:justify-end">
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
