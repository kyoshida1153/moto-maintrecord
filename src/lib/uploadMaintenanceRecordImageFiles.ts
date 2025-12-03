"use server";

import path from "node:path";
import crypto from "node:crypto";
import { getCurrentUser } from "@/lib/auth";
import { supabase } from "@/lib";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

import * as z from "zod";
import { FileImageSchema } from "@/validations";
const FileImageArraySchema = z.array(FileImageSchema);

type Response = {
  success: boolean;
  message: string;
  result?: string[];
};

export async function uploadMaintenanceRecordImageFiles(
  imageFiles: File[],
): Promise<Response> {
  try {
    // 認証チェック
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("認証チェックに失敗。");
    }
    const userId = currentUser.id;

    // バリデーションチェック
    const validated = FileImageArraySchema.safeParse(imageFiles);
    if (!validated.success) {
      throw new Error("バリデーションチェックに失敗。");
    }

    // 画像が未選択の場合
    if (imageFiles.length === 1 && imageFiles[0].size === 0) {
      return {
        success: true,
        message: "画像未選択。アップロード無し。",
      };
    }

    const maxFileCount = Number(process.env.NEXT_PUBLIC_MAX_FILE_COUNT);

    // Promise.allで並列処理を行うための関数の配列
    // 画像ファイルをストレージにアップロード、返値はアップロード先のURL
    const uploadPromises = imageFiles
      .slice(0, maxFileCount)
      .map(async (file): Promise<string> => {
        // アップロード用ファイルパスを作成
        const yearMonth = format(new Date(), "yyyy/MM", { locale: ja });
        const fileName = crypto.randomUUID();
        const fileExtName = path.extname(file.name).toLowerCase();
        const filePath = `${userId}/maintenance-records/${yearMonth}/${fileName}${fileExtName}`;

        const { error } = await supabase.storage
          .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET as string)
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) throw error;

        // アップロードした画像のURLを取得
        const { data } = supabase.storage
          .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET as string)
          .getPublicUrl(filePath);

        return data.publicUrl;
      });

    const imageUrls = await Promise.all(uploadPromises);

    return {
      success: true,
      message: "画像のアップロードに成功しました。",
      result: imageUrls,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return {
      success: false,
      message: "画像のアップロードに失敗しました。",
    };
  }
}
