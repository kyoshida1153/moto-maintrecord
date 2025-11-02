"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import Loading from "@/components/Loading";
import getMaintenanceRecord from "@/lib/getMaintenanceRecord";
import deleteMaintenanceRecord from "./deleteMaintenanceRecord";
import type { MaintenanceRecordUniqueSelect } from "@/app/api/maintenance-records/[id]/route";

type GetMaintenanceRecordResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: MaintenanceRecordUniqueSelect;
};

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export default function MaintenanceRecordDeleteForm({
  maintenanceRecordId,
}: {
  maintenanceRecordId: string;
}) {
  const [getMaintenanceRecordResponse, setGetMaintenanceRecordResponse] =
    useState<GetMaintenanceRecordResponse>({
      status: undefined,
      message: "",
    });
  const [isLoadingGetMaintenanceRecord, setIsLoadingGetMaintenanceRecord] =
    useState<boolean>(true);

  // フォームのデータの読み込み
  useEffect(() => {
    (async () => {
      const response = await getMaintenanceRecord(maintenanceRecordId);
      setIsLoadingGetMaintenanceRecord(false);
      setGetMaintenanceRecordResponse({
        status: response.success === true ? "success" : "error",
        message: response.message,
        result: response.result,
      });
    })();
  }, []);

  // フォームの送信開始～終了で使うもの
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>({
    status: undefined,
    message: "",
  });
  const router = useRouter();

  const onSubmit = async () => {
    setIsSubmitting(true);

    const response = await deleteMaintenanceRecord(maintenanceRecordId);
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
    <>
      {isLoadingGetMaintenanceRecord ? (
        <div className="flex w-full max-w-lg justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : getMaintenanceRecordResponse.status === "success" ? (
        <div className="mt-6 md:mt-8">
          <div className="flex flex-col gap-4 md:gap-6">
            <p>以下の整備・出費記録を削除しますか？</p>
            <div className="display rounded border border-solid border-[var(--border-color-gray)] bg-white p-6 md:p-8">
              <div className="flex flex-col gap-4 md:gap-6">
                <section className="flex flex-col gap-1 md:gap-2">
                  <p className="text-md md:text-lg">
                    {getMaintenanceRecordResponse.result?.calenderDate &&
                      format(
                        getMaintenanceRecordResponse.result?.calenderDate,
                        "yyyy年M月d日",
                        { locale: ja },
                      )}
                  </p>
                  <p className="text-xl md:text-2xl">
                    {getMaintenanceRecordResponse.result?.title}
                  </p>
                  <p className="text-xl md:text-2xl">
                    <span className="font-alphanumeric">
                      {getMaintenanceRecordResponse.result?.cost.toLocaleString()}
                    </span>
                    円
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
                <div className="flex justify-center gap-3 md:justify-start">
                  <Button
                    variant="outlined"
                    disableElevation
                    sx={{
                      backgroundColor: "#fff",
                      maxWidth: "fit-content",
                      px: "1.5em",
                      fontSize: "16px",
                    }}
                    disabled={isSubmitting || isSubmitSuccessful}
                    onClick={router.back}
                  >
                    キャンセル
                  </Button>
                  <Button
                    variant="contained"
                    disableElevation
                    sx={{
                      fontSize: "16px",
                      px: "1.5em",
                      display: "flex",
                      gap: "0.25em",
                      whiteSpace: "nowrap",
                    }}
                    disabled={isSubmitting || isSubmitSuccessful}
                    onClick={onSubmit}
                  >
                    {isSubmitting ? <Loading size="18px" /> : ""}
                    {isSubmitting ? <>送信中</> : ""}
                    {isSubmitSuccessful ? <>削除済</> : ""}
                    {!isSubmitting && !isSubmitSuccessful ? <>削除</> : ""}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>{getMaintenanceRecordResponse.message}</p>
      )}
    </>
  );
}
