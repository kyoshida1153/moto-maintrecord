import * as z from "zod";

const mimeTypes = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "image/avif",
];

export const FileImageSchema = z
  .custom<File>()
  .refine((file) => file.size > 0, {
    message: "ファイルを選択してください。",
  })
  .refine((file) => mimeTypes.includes(file?.type), {
    message: "画像以外のファイルはアップロードできません。",
  })
  .refine((file) => file?.size <= 1000 * 1000 * 1, {
    message: "アップロードできるサイズは1MB以内です。",
  });
