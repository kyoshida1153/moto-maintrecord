"use client";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

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

export default function InputFileImage({
  name = "image",
  label = "画像を選択",
  multiple = false,
  maxFileCount = 1,
}: {
  name: string;
  label: string;
  multiple: boolean;
  maxFileCount?: number;
}) {
  const [files, setFiles] = useState<File[] | null>(null);

  const changeFileList = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return setFiles(null);
    if (multiple === true) {
      const limitedFiles = Array.from(files).slice(0, maxFileCount);
      setFiles(limitedFiles);
    } else {
      const limitedFiles = Array.from(files).slice(0, 1);
      setFiles(limitedFiles);
    }
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
          onChange={changeFileList}
          multiple={multiple ? true : false}
          accept="image/*"
          name={name}
        />
      </Button>
      {files && files.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(calc((100%-1em)/3),1fr))] gap-[0.5em]">
          {[...files].map((file, i) => {
            return (
              <Image
                key={i}
                src={URL.createObjectURL(file)}
                width={200}
                height={200}
                className="aspect-square h-full w-full object-cover"
                alt=""
              />
            );
          })}
        </div>
      ) : (
        <p className="text-sm">画像を選択してください。</p>
      )}
    </div>
  );
}
