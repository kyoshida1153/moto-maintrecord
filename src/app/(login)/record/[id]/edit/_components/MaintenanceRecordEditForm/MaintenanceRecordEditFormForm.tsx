"use client";

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
import { Controller } from "react-hook-form";
import { useMaintenanceRecordEditFormState } from "./stores";
import { useMaintenanceRecordEditForm } from "./hooks";

export default function MaintenanceRecordEditFormForm() {
  const {
    control,
    handleSubmit,
    isSubmitting,
    isSubmitSuccessful,
    errors,
    onSubmit,
    submitResponse,
  } = useMaintenanceRecordEditForm();

  const {
    getBikesResponse,
    getMaintenanceCategoriesResponse,
    getMaintenanceRecordResponse,
  } = useMaintenanceRecordEditFormState();

  // セレクトボックスの項目: 所有バイク
  const selectBoxItemListBike = getBikesResponse.result
    ? getBikesResponse.result.map((item) => {
        return {
          value: item.id,
          text: item.name,
        };
      })
    : [];

  // セレクトボックスの項目: カテゴリー
  const selectBoxItemListMaintenanceCategory =
    getMaintenanceCategoriesResponse.result
      ? getMaintenanceCategoriesResponse.result.map((item) => {
          return {
            value: item.id,
            text: item.name,
          };
        })
      : [];

  return (
    <>
      {getMaintenanceRecordResponse.status === "success" ? (
        <Box
          component="form"
          className="mt-6 md:mt-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4 md:gap-6">
            <Controller
              name="id"
              control={control}
              render={({ field }) => (
                <input
                  type="hidden"
                  name={field.name}
                  ref={field.ref}
                  value={field.value}
                />
              )}
            />
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
                    getMaintenanceRecordResponse.result?.maintenanceRecordImages
                      ? getMaintenanceRecordResponse.result
                          .maintenanceRecordImages
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
      ) : (
        <p>
          {getMaintenanceRecordResponse.message
            ? getMaintenanceRecordResponse.message
            : "読み込みに失敗しました。"}
        </p>
      )}
    </>
  );
}
