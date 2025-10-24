"use server";

import path from "node:path";
import crypto from "node:crypto";
import { supabase } from "@/lib/supabaseClient";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function uploadBikeImageFile(
  imageFile: File,
): Promise<{ success: boolean; message: string; imageUrl?: string }> {
  // 認証チェック
  const currentUser = await getCurrentUser();
  const userId: string = currentUser?.id ?? "";
  if (!currentUser && !userId) {
    return {
      success: false,
      message: "画像のアップロードに失敗しました。",
    };
  }

  // 画像が未選択の場合
  if (imageFile.size === 0) {
    return {
      success: true,
      message: "デフォルトの画像を設定。",
    };
  }

  // アップロード用ファイルパス作成
  const imageFileName = crypto.randomUUID();
  const imageFileExtName = path.extname(imageFile.name).toLowerCase();
  const uploadFilePath = `${userId}/bikes/${imageFileName}${imageFileExtName}`;

  // ストレージにアップロード
  const { error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET as string)
    .upload(uploadFilePath, imageFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    return {
      success: false,
      message: "画像のアップロードに失敗しました。",
    };
  }

  // アップロード
  const { data } = supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET as string)
    .getPublicUrl(uploadFilePath);
  const imageUrl = data.publicUrl;

  return {
    success: true,
    message: "画像のアップロードに成功しました。",
    imageUrl: imageUrl,
  };
}
