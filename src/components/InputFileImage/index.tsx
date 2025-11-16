"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type PreviewImageUrl = {
  id?: string;
  imageUrl: string;
};

// ※アップロードする画像の数を制限する処理はサーバー側で行う
export function InputFileImage({
  name,
  label = "画像を選択",
  multiple = false,
  maxFileCount = 1,
  disabled = false,
  defaultValue = [],
}: {
  name: string;
  label?: string;
  multiple?: boolean;
  maxFileCount?: number;
  disabled?: boolean;
  defaultValue?: PreviewImageUrl[];
}) {
  const [previewImageUrls, setPreviewImageUrls] =
    useState<PreviewImageUrl[]>(defaultValue);
  const [isChangedInputFileImage, setIsChangedInputFileImage] =
    useState<boolean>(false);

  const changePreviewImageUrls = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return setPreviewImageUrls([]);

    if (isChangedInputFileImage === false) {
      setIsChangedInputFileImage(true);
    }

    const limitedFiles =
      multiple === true
        ? Array.from(files).slice(0, maxFileCount)
        : Array.from(files).slice(0, 1);

    const newPreviewImageUrls = limitedFiles.map((file) => {
      return { imageUrl: URL.createObjectURL(file) };
    });

    setPreviewImageUrls(newPreviewImageUrls);
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
        <VisuallyHiddenInput
          type="file"
          onChange={changePreviewImageUrls}
          multiple={multiple ? true : false}
          accept="image/*"
          name={name}
          disabled={disabled ? true : false}
        />
      </Button>
      <input
        type="checkbox"
        name={`isChangedInputFileImage_${name}`}
        checked={isChangedInputFileImage}
        className="hidden"
        readOnly
      />
      {previewImageUrls && previewImageUrls.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(calc((100%-1em)/3),1fr))] gap-[0.5em]">
          {previewImageUrls.map((previewImageUrl, i) => {
            return (
              <Image
                key={previewImageUrl.id ?? i}
                src={previewImageUrl.imageUrl}
                width={200}
                height={200}
                className="aspect-square h-full w-full object-cover"
                alt=""
              />
            );
          })}
        </div>
      ) : (
        <p className="text-sm">選択中の画像: 無し</p>
      )}
    </div>
  );
}
