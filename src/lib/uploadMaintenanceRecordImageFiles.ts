"use server";

import path from "node:path";
import crypto from "node:crypto";
import { getCurrentUser } from "@/actions";
import { supabase } from "@/lib";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export async function uploadMaintenanceRecordImageFiles(
  imageFiles: File[],
): Promise<{
  success: boolean;
  message: string;
  imageUrls?: { imageUrl: string }[];
}> {
  // 認証チェック
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return {
      success: false,
      message: "画像のアップロードに失敗しました。",
    };
  }
  const userId = currentUser.id;

  // File型チェック
  const imageFilesErrorDetection = imageFiles.filter(
    (imageFile) => !(imageFile instanceof File),
  );
  if (imageFilesErrorDetection.length > 0) {
    return {
      success: false,
      message: "画像のアップロードに失敗しました。",
    };
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
    .map(async (file): Promise<{ imageUrl: string }> => {
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
      const { data: urlData } = supabase.storage
        .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET as string)
        .getPublicUrl(filePath);

      return { imageUrl: urlData.publicUrl };
    });

  const imageUrls = await Promise.all(uploadPromises);

  return {
    success: true,
    message: "画像のアップロードに成功しました。",
    imageUrls,
  };
}
