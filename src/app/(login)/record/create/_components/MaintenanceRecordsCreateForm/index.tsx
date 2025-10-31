"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import Loading from "@/components/Loading";
import DatePicker from "@/components/DatePicker";
import SelectBox from "@/components/SelectBox";
import InputFileImage from "@/components/InputFileImage";
import { getBikes } from "@/lib/getBikes";
import { getMaintenanceCategories } from "@/lib/getMaintenanceCategories";
import { uploadMaintenanceRecordImageFiles } from "@/lib/uploadMaintenanceRecordImageFiles";
import { createMaintenanceRecord } from "./createMaintenanceRecord";

import type { BikeSelect } from "@/app/api/bikes/route";
import type { MaintenanceCategorySelect } from "@/app/api/maintenance-categories/route";

type GetBikesResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: BikeSelect[];
};

type GetMaintenanceCategoriesResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: MaintenanceCategorySelect[];
};

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export default function MaintenanceRecordsCreateForm() {
  // フォームのセレクトボックスの設定で使うもの
  const [getBikesResponse, setGetBikesResponse] = useState<GetBikesResponse>({
    status: undefined,
    message: "",
  });
  const [isLoadingGetBikes, setIsLoadingGetBikes] = useState<boolean>(true);

  const [
    getMaintenanceCategoriesResponse,
    setGetMaintenanceCategoriesResponse,
  ] = useState<GetMaintenanceCategoriesResponse>({
    status: undefined,
    message: "",
  });
  const [
    isLoadingGetMaintenanceCategoriesResponse,
    setIsLoadingGetMaintenanceCategoriesResponse,
  ] = useState<boolean>(true);

  // セレクトボックスに設定するデータの読み込み
  useEffect(() => {
    Promise.all([
      (async () => {
        const response = await getBikes();
        setIsLoadingGetBikes(false);
        setGetBikesResponse({
          status: response.success === true ? "success" : "error",
          message: response.message,
          result: response.result,
        });
      })(),
      (async () => {
        const response = await getMaintenanceCategories();
        setIsLoadingGetMaintenanceCategoriesResponse(false);
        setGetMaintenanceCategoriesResponse({
          status: response.success === true ? "success" : "error",
          message: response.message,
          result: response.result,
        });
      })(),
    ]);
  }, []);

  // フォームの送信開始～終了で使うもの
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>({
    status: undefined,
    message: "",
  });
  const router = useRouter();

  // フォームの送信開始～終了
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    try {
      const formData = new FormData(e.currentTarget);

      // ここから画像アップロード
      const imageFiles = formData.getAll("imageFiles");

      if (imageFiles.some((imageFile) => !(imageFile instanceof File))) {
        setIsSubmitting(false);
        setSubmitResponse({
          message: "画像のアップロードに失敗しました。",
          status: "error",
        });
        return;
      }

      const uploadResponse = await uploadMaintenanceRecordImageFiles(
        imageFiles as File[],
      );

      setSubmitResponse({
        message: uploadResponse.message,
        status: uploadResponse.success === true ? "success" : "error",
      });

      // ここからAPIでDB操作
      const calenderDate = formData.get("calenderDate");
      const isDone = formData.get("isDone");
      const title = formData.get("title");
      const cost = formData.get("cost");
      const bikeId = formData.get("bikeId");
      const maintenanceCategoryId = formData.get("maintenanceCategoryId");
      const memo = formData.get("memo");
      const mileage = formData.get("mileage");

      const data = {
        calenderDate: new Date(calenderDate as string),
        isDone: isDone ? true : false,
        title: title as string,
        cost: Number(cost),
        bikeId: bikeId ? (bikeId as string) : null,
        maintenanceCategoryId: maintenanceCategoryId
          ? (maintenanceCategoryId as string)
          : null,
        memo: memo ? (memo as string) : null,
        mileage: mileage ? Number(mileage) : null,
      };

      if (uploadResponse && uploadResponse.success === true) {
        Object.assign(data, {
          maintenanceRecordImages: uploadResponse.imageUrls,
        });
      }

      const maintenanceRecordResponse = await createMaintenanceRecord(data);
      setIsSubmitting(false);
      setSubmitResponse({
        message: maintenanceRecordResponse.message,
        status:
          maintenanceRecordResponse.success === true ? "success" : "error",
      });

      if (maintenanceRecordResponse.success === true) {
        setIsSubmitSuccessful(true);
        setTimeout(() => {
          router.push("/record");
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

  return (
    <div className="w-full max-w-lg">
      <Box component="form" className="mt-6 md:mt-8" onSubmit={onSubmit}>
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex gap-4">
            <DatePicker
              name="calenderDate"
              label="実施日や予定日"
              disabled={isSubmitting || isSubmitSuccessful}
            />
            <FormControlLabel
              control={<Checkbox />}
              name="isDone"
              label="実施済み"
              className="whitespace-nowrap"
              disabled={isSubmitting || isSubmitSuccessful}
            />
          </div>

          <TextField
            required
            id="title"
            label="タイトル"
            type="text"
            name="title"
            sx={{ backgroundColor: "#fff" }}
            disabled={isSubmitting || isSubmitSuccessful}
          />

          <TextField
            required
            id="cost"
            label="金額"
            type="number"
            name="cost"
            sx={{ backgroundColor: "#fff" }}
            disabled={isSubmitting || isSubmitSuccessful}
          />

          {isLoadingGetBikes ? (
            <div className="flex w-full justify-center py-2">
              <Loading size="36px" />
            </div>
          ) : getBikesResponse.result && getBikesResponse.result.length > 0 ? (
            <SelectBox
              name="bikeId"
              label="所有バイク"
              itemList={[
                { value: "", text: "未選択" },
                ...getBikesResponse.result.map((bike) => {
                  return {
                    value: bike.id,
                    text: bike.name,
                  };
                }),
              ]}
              disabled={isSubmitting || isSubmitSuccessful}
            />
          ) : getBikesResponse.status === "success" ? (
            <SelectBox name="bikeId" label="所有バイク未登録" disabled={true} />
          ) : (
            <p className="py-4 text-center">{getBikesResponse.message}</p>
          )}

          {isLoadingGetMaintenanceCategoriesResponse ? (
            <div className="flex w-full justify-center py-2">
              <Loading size="36px" />
            </div>
          ) : getMaintenanceCategoriesResponse.result &&
            getMaintenanceCategoriesResponse.result.length > 0 ? (
            <SelectBox
              name="maintenanceCategoryId"
              label="カテゴリー"
              itemList={[
                { value: "", text: "未選択" },
                ...getMaintenanceCategoriesResponse.result.map(
                  (maintenanceCategory) => {
                    return {
                      value: maintenanceCategory.id,
                      text: maintenanceCategory.name,
                    };
                  },
                ),
              ]}
              disabled={isSubmitting || isSubmitSuccessful}
            />
          ) : getMaintenanceCategoriesResponse.status === "success" ? (
            <SelectBox
              name="maintenanceCategoryId"
              label="カテゴリー未登録"
              disabled={true}
            />
          ) : (
            <p className="py-4 text-center">{getBikesResponse.message}</p>
          )}

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

          <InputFileImage
            name="imageFiles"
            multiple={true}
            label="写真・画像"
            maxFileCount={Number(process.env.NEXT_PUBLIC_MAX_FILE_COUNT)}
            disabled={isSubmitting || isSubmitSuccessful}
          />

          <TextField
            id="mileage"
            label="走行距離（km）"
            type="number"
            name="mileage"
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
