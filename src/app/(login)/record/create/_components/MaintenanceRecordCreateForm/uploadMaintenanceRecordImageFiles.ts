"use server";

import path from "node:path";
import crypto from "node:crypto";
import getCurrentUser from "@/actions/getCurrentUser";
import { supabase } from "@/lib/supabaseClient";
import { format } from "date-fns";

export async function uploadMaintenanceRecordImageFiles(
  imageFiles: File[],
): Promise<{
  success: boolean;
  message: string;
  imageUrls?: { imageUrl: string }[];
}> {
  // 認証チェック
  const currentUser = await getCurrentUser();
  const userId: string = currentUser?.id ?? "";
  if (!currentUser && !userId) {
    return {
      success: false,
      message: "画像のアップロードに失敗しました。",
    };
  }

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
      message: "選択された画像: なし",
    };
  }

  const maxFileCount = Number(process.env.NEXT_PUBLIC_MAX_FILE_COUNT);

  // 画像ファイルをアップロード、アップロード先のURLを返す関数
  // Promise.allで並列処理
  // 環境変数でアップロード数を制限
  const uploadPromises = imageFiles
    .filter((file, i) => i < maxFileCount)
    .map(async (file): Promise<{ imageUrl: string }> => {
      // アップロード用ファイルパスを作成し、ストレージにアップロード
      const yearMonth = format(new Date(), "yyyy/MM");
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

  const urls = await Promise.all(uploadPromises);

  return {
    success: true,
    message: "画像のアップロードに成功しました。",
    imageUrls: urls,
  };
}
