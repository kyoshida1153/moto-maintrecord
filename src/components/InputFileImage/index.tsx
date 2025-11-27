"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { useInputFileImageStore } from "./stores";
import type { FieldError, FieldValues, Merge } from "react-hook-form";

const mimeTypes = [
  "image/apng",
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/webp",
];

type PreviewImageUrl = {
  id?: string;
  imageUrl: string;
};

export function InputFileImage({
  defaultValue = [],
  disabled = false,
  field,
  fieldError,
  label = "画像を選択",
  maxFileCount = 1,
  multiple = false,
}: {
  defaultValue?: PreviewImageUrl[];
  disabled?: boolean;
  field: FieldValues;
  fieldError?: Merge<FieldError, (FieldError | undefined)[]>;
  label?: string;
  maxFileCount?: number;
  multiple?: boolean;
}) {
  const [previewImageUrls, setPreviewImageUrls] =
    useState<PreviewImageUrl[]>(defaultValue);

  // const [isChangedInputFileImage, setIsChangedInputFileImage] =
  //   useState<boolean>(false);
  const { isChangedInputFileImage, setIsChangedInputFileImage } =
    useInputFileImageStore();

  const changePreviewImageUrls = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log("files", files);
    console.log("fieldError", fieldError);
    if (!files) return setPreviewImageUrls([]);

    if (isChangedInputFileImage === false) {
      setIsChangedInputFileImage(true);
    }

    const limitedFiles =
      multiple === true
        ? Array.from(files).slice(0, maxFileCount)
        : Array.from(files).slice(0, 1);

    const newPreviewImageUrlArray = limitedFiles.map((file) => {
      const imageUrl = mimeTypes.includes(file.type)
        ? URL.createObjectURL(file)
        : "";
      return { imageUrl };
    });
    setPreviewImageUrls(newPreviewImageUrlArray);
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<AddPhotoAlternateIcon />}
        disableElevation
        sx={{
          maxWidth: "fit-content",
          whiteSpace: "nowrap",
        }}
      >
        {label}
        {multiple && maxFileCount > 1 && <span>（{maxFileCount}枚まで）</span>}
        <input
          type="file"
          multiple={multiple ? true : false}
          accept="image/*"
          disabled={disabled ? true : false}
          name={field.name}
          ref={field.ref}
          onChange={(e) => {
            field.onChange([...Array.from(e.target.files ?? [])]);
            changePreviewImageUrls(e);
          }}
          onBlur={field.onBlur}
          style={{
            clip: "rect(0 0 0 0)",
            clipPath: "inset(50%)",
            height: 1,
            overflow: "hidden",
            position: "absolute",
            bottom: 0,
            left: 0,
            whiteSpace: "nowrap",
            width: 1,
          }}
        />
      </Button>
      <input
        type="checkbox"
        name={`isChangedInputFileImage_${field.name}`}
        checked={isChangedInputFileImage}
        className="hidden"
        readOnly
      />

      {/* 画像プレビュー */}
      {previewImageUrls && previewImageUrls.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(calc((100%-1em)/3),1fr))] gap-[0.5em]">
          {previewImageUrls.map((previewImageUrl, i) => {
            return (
              <div
                key={previewImageUrl.id ?? i}
                className="relative flex aspect-square h-full w-full items-center justify-center rounded"
              >
                {previewImageUrl.imageUrl ? (
                  <Image
                    src={previewImageUrl.imageUrl}
                    width={200}
                    height={200}
                    className="aspect-square h-full w-full rounded object-cover"
                    alt=""
                  />
                ) : (
                  <ImageNotSupportedIcon
                    sx={{
                      fontSize: { xs: "4em", sm: "5em" },
                    }}
                  />
                )}

                {Array.isArray(fieldError) && fieldError[i]?.message ? (
                  <div className="absolute top-0 flex aspect-square h-full w-full items-center justify-center bg-[#ffffffcc] object-cover">
                    <p className="w-[85%] text-sm text-[#d32f2f]">
                      {fieldError[i].message}
                    </p>
                  </div>
                ) : fieldError?.message ? (
                  <div className="absolute top-0 flex aspect-square h-full w-full items-center justify-center bg-[#ffffffcc] object-cover">
                    <p className="w-[85%] text-sm text-[#d32f2f]">
                      {fieldError.message}
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm">選択中の画像: 無し</p>
      )}
    </div>
  );
}
