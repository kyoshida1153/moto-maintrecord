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

import { findBikes } from "./findBikes";
import { findMaintenanceCategories } from "./findMaintenanceCategories";
import { createMaintenanceRecord } from "./createMaintenanceRecord";
import { uploadMaintenanceRecordImageFiles } from "./uploadMaintenanceRecordImageFiles";

import type { BikeSelect } from "@/app/api/bikes/route";
import type { MaintenanceCategorySelect } from "@/app/api/maintenance-categories/route";

type SubmitResponse = {
  status: "success" | "error" | undefined;
  message: string;
};

export default function MaintenanceRecordsCreateForm() {
  // セレクトボックスの内容の読み込み
  const [bikes, setBikes] = useState<BikeSelect[]>([]);
  const [bikesLoading, setBikesLoading] = useState<boolean>(true);
  const [maintenanceCategories, setMaintenanceCategories] = useState<
    MaintenanceCategorySelect[]
  >([]);
  const [maintenanceCategoriesLoading, setMaintenanceCategoriesLoading] =
    useState<boolean>(true);

  useEffect(() => {
    Promise.all([
      (async () => {
        const result = await findBikes();
        setBikesLoading(false);
        if (result) setBikes(result);
      })(),
      (async () => {
        const result = await findMaintenanceCategories();
        setMaintenanceCategoriesLoading(false);
        if (result) setMaintenanceCategories(result);
      })(),
    ]);
  }, []);

  // フォーム送信
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

    try {
      const formData = new FormData(e.currentTarget);

      // 画像アップロード
      const imageFiles = formData.getAll("imageFiles");
      const uploadResponse = await uploadMaintenanceRecordImageFiles(
        imageFiles as File[],
      );

      setSubmitResponse({
        message: uploadResponse.message,
        status: uploadResponse.success === true ? "success" : "error",
      });

      // APIでDB操作
      const calenderDate = formData.get("calenderDate");
      const isDone = formData.get("isDone");
      const title = formData.get("title");
      const cost = formData.get("cost");
      const bikeId = formData.get("bikeId");
      const maintenanceCategoryId = formData.get("maintenanceCategoryId");
      const memo = formData.get("memo");
      const mileage = formData.get("mileage");

      const baseData = {
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
      const imageData = uploadResponse.imageUrls;

      const maintenanceRecordResponse = await createMaintenanceRecord(
        baseData,
        imageData,
      );
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

          {bikesLoading ? (
            <div className="flex w-full justify-center py-2">
              <Loading size="36px" />
            </div>
          ) : bikes && bikes.length > 0 ? (
            <SelectBox
              name="bikeId"
              label="所有バイク"
              itemList={[
                { value: "", text: "未選択" },
                ...bikes?.map((bike) => {
                  return {
                    value: bike.id,
                    text: bike.name,
                  };
                }),
              ]}
              disabled={isSubmitting || isSubmitSuccessful}
            />
          ) : (
            <SelectBox name="bikeId" label="所有バイク未登録" disabled={true} />
          )}

          {maintenanceCategoriesLoading ? (
            <div className="flex w-full justify-center py-2">
              <Loading size="36px" />
            </div>
          ) : maintenanceCategories && maintenanceCategories.length > 0 ? (
            <SelectBox
              name="maintenanceCategoryId"
              label="カテゴリー"
              itemList={[
                { value: "", text: "未選択" },
                ...maintenanceCategories?.map((maintenanceCategory) => {
                  return {
                    value: maintenanceCategory.id,
                    text: maintenanceCategory.name,
                  };
                }),
              ]}
              disabled={isSubmitting || isSubmitSuccessful}
            />
          ) : (
            <SelectBox
              name="maintenanceCategoryId"
              label="カテゴリー未登録"
              disabled={true}
            />
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
