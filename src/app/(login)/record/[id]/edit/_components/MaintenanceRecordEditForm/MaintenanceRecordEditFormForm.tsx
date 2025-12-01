"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

import {
  TextField,
  SubmitButton,
  DatePicker,
  SelectBox,
  InputFileImage,
  Checkbox,
} from "@/components";
import { useInputFileImageStore } from "@/components/InputFileImage/stores";
import { uploadMaintenanceRecordImageFiles } from "@/lib";
import { updateMaintenanceRecord } from "@/lib/api";
import { useMaintenanceRecordEditFormState } from "./stores";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { MaintenanceRecordEditFormSchema } from "./validations";
import type * as z from "zod";

type SubmitResponse = {
  status: "success" | "error" | "info" | undefined;
  message: string;
};

export default function MaintenanceRecordEditFormForm() {
  const params = useParams<{ id: string }>();
  const maintenanceRecordId = params.id;

  const {
    getBikesResponse,
    getMaintenanceCategoriesResponse,
    getMaintenanceRecordResponse,
  } = useMaintenanceRecordEditFormState();

  // セレクトボックスの項目
  const selectBoxItemListBike = getBikesResponse.result
    ? getBikesResponse.result.map((item) => {
        return {
          value: item.id,
          text: item.name,
        };
      })
    : [];

  const selectBoxItemListMaintenanceCategory =
    getMaintenanceCategoriesResponse.result
      ? getMaintenanceCategoriesResponse.result.map((item) => {
          return {
            value: item.id,
            text: item.name,
          };
        })
      : [];

  // フォームのデフォルト値
  const defaultValues = getMaintenanceRecordResponse.result;

  // フォームの送信開始～終了で使うもの
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>({
    status: undefined,
    message: "",
  });
  const { isChangedInputFileImage } = useInputFileImageStore();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm<z.infer<typeof MaintenanceRecordEditFormSchema>>({
    resolver: zodResolver(MaintenanceRecordEditFormSchema),
    defaultValues: {
      bikeId: defaultValues?.bike?.id ?? "",
      maintenanceCategoryId: defaultValues?.maintenanceCategory?.id ?? "",
      calenderDate: defaultValues?.calenderDate
        ? new Date(defaultValues.calenderDate)
        : undefined,
      isDone: defaultValues?.isDone ?? false,
      title: defaultValues?.title ?? "",
      cost: defaultValues?.cost ?? undefined,
      memo: defaultValues?.memo ?? undefined,
      mileage: defaultValues?.mileage ?? undefined,
      imageFiles: undefined,
    },
    mode: "onChange",
  });

  // フォームの送信開始～終了
  const onSubmit = async (
    values: z.infer<typeof MaintenanceRecordEditFormSchema>,
  ) => {
    setSubmitResponse({
      status: undefined,
      message: "",
    });

    // ここから画像アップロード
    const uploadResponse =
      values.imageFiles && values.imageFiles.length > 0
        ? await uploadMaintenanceRecordImageFiles(values.imageFiles)
        : undefined;

    if (uploadResponse) {
      setSubmitResponse({
        message: uploadResponse.message,
        status: uploadResponse.success === true ? "success" : "error",
      });
      if (uploadResponse?.success === false) {
        setTimeout(() => {
          reset(undefined, { keepValues: true });
        }, 300);
        return;
      }
    }

    // ここからAPIでDB操作
    const data = {
      bikeId: values.bikeId,
      maintenanceCategoryId: values.maintenanceCategoryId,
      calenderDate: values.calenderDate,
      isDone: values.isDone,
      title: values.title,
      cost: values.cost,
      memo: values.memo,
      mileage: values.mileage,
    };

    if (
      // 別の画像に変更した場合
      uploadResponse &&
      uploadResponse.success === true
    ) {
      Object.assign(data, {
        maintenanceRecordImageUrls: uploadResponse.result,
      });
    } else if (
      // 画像を無しにした場合
      isChangedInputFileImage === true &&
      values.imageFiles &&
      values.imageFiles.length === 0
    ) {
      Object.assign(data, { maintenanceRecordImageUrls: null });
    }

    const updateMaintenanceRecordResponse = await updateMaintenanceRecord({
      id: maintenanceRecordId,
      data,
    });

    setSubmitResponse({
      message: updateMaintenanceRecordResponse.message,
      status:
        updateMaintenanceRecordResponse.success === true ? "success" : "error",
    });

    if (updateMaintenanceRecordResponse.success === true) {
      setTimeout(() => {
        router.back();
      }, 2000);
      return;
    } else {
      setTimeout(() => {
        reset(undefined, { keepValues: true });
      }, 300);
      return;
    }
  };

  return (
    <Box
      component="form"
      className="mt-6 md:mt-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="relative">
          <Controller
            name="calenderDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                field={field}
                fieldError={errors.calenderDate}
                label="日付 *"
                disabled={isSubmitting || isSubmitSuccessful}
                width="160px"
              />
            )}
          />
          <div className="absolute top-2 left-[200px]">
            <Controller
              name="isDone"
              control={control}
              render={({ field }) => (
                <Checkbox
                  field={field}
                  fieldError={errors.isDone}
                  label="実施済み"
                  disabled={isSubmitting || isSubmitSuccessful}
                />
              )}
            />
          </div>
        </div>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              required={true}
              field={field}
              label="タイトル"
              type="text"
              disabled={isSubmitting || isSubmitSuccessful}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
        <Controller
          name="cost"
          control={control}
          render={({ field }) => (
            <TextField
              required={true}
              field={field}
              label="金額"
              type="number"
              disabled={isSubmitting || isSubmitSuccessful}
              error={!!errors.cost}
              helperText={errors.cost?.message}
              width="160px"
            />
          )}
        />

        {getBikesResponse.status === "success" ? (
          <Controller
            name="bikeId"
            control={control}
            render={({ field }) => (
              <SelectBox
                field={field}
                fieldError={errors.bikeId}
                label={
                  selectBoxItemListBike.length > 0
                    ? "所有バイク"
                    : "所有バイク未登録"
                }
                itemList={[
                  { value: "", text: "未選択" },
                  ...selectBoxItemListBike,
                ]}
                disabled={
                  selectBoxItemListBike.length > 0
                    ? isSubmitting || isSubmitSuccessful
                    : true
                }
              />
            )}
          />
        ) : (
          <p className="py-4 text-center">{getBikesResponse.message}</p>
        )}

        {getMaintenanceCategoriesResponse.status === "success" ? (
          <Controller
            name="maintenanceCategoryId"
            control={control}
            render={({ field }) => (
              <SelectBox
                field={field}
                fieldError={errors.maintenanceCategoryId}
                label={
                  selectBoxItemListMaintenanceCategory.length > 0
                    ? "カテゴリー"
                    : "カテゴリー未登録"
                }
                itemList={[
                  { value: "", text: "未選択" },
                  ...selectBoxItemListMaintenanceCategory,
                ]}
                disabled={
                  selectBoxItemListMaintenanceCategory.length > 0
                    ? isSubmitting || isSubmitSuccessful
                    : true
                }
              />
            )}
          />
        ) : (
          <p className="py-4 text-center">{getBikesResponse.message}</p>
        )}

        <Controller
          name="memo"
          control={control}
          render={({ field }) => (
            <TextField
              field={field}
              label="メモ"
              multiline={true}
              type="text"
              disabled={isSubmitting || isSubmitSuccessful}
              error={!!errors.memo}
              helperText={errors.memo?.message}
              rows={6}
            />
          )}
        />
        <Controller
          name="mileage"
          control={control}
          render={({ field }) => (
            <TextField
              field={field}
              label="走行距離（km）"
              type="number"
              disabled={isSubmitting || isSubmitSuccessful}
              error={!!errors.mileage}
              helperText={errors.mileage?.message}
              width="160px"
            />
          )}
        />
        <Controller
          name="imageFiles"
          control={control}
          render={({ field }) => (
            <InputFileImage
              defaultValue={
                defaultValues?.maintenanceRecordImages
                  ? defaultValues.maintenanceRecordImages
                  : undefined
              }
              disabled={isSubmitting || isSubmitSuccessful}
              field={field}
              fieldError={errors.imageFiles}
              label="画像"
              maxFileCount={Number(process.env.NEXT_PUBLIC_MAX_FILE_COUNT)}
              multiple={true}
            />
          )}
        />

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

        <div className="flex justify-center md:justify-end">
          <SubmitButton
            variant="contained"
            isSubmitting={isSubmitting}
            isSubmitSuccessful={isSubmitSuccessful}
            labels={{
              default: "保存",
              isSubmitting: "送信中",
              isSubmitSuccessful: "送信完了",
            }}
          />
        </div>
      </div>
    </Box>
  );
}
