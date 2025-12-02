"use server";

import path from "node:path";
import crypto from "node:crypto";
import { supabase } from "@/lib";
import { getCurrentUser } from "@/actions";

import * as z from "zod";
import { FileImageSchema } from "@/validations";
const FileImageArraySchema = z.array(FileImageSchema);

type Response = {
  success: boolean;
  message: string;
  result?: string;
};

export async function uploadBikeImageFile(
  imageFile: File[],
): Promise<Response> {
  try {
    // 認証チェック
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("認証チェックに失敗。");
    }
    const userId = currentUser.id;

    // バリデーションチェック
    const validated = FileImageArraySchema.safeParse(imageFile);
    if (!validated.success) {
      throw new Error("バリデーションチェックに失敗。");
    }

    // 画像が未選択の場合
    if (imageFile[0].size === 0) {
      return {
        success: true,
        message: "画像未選択。デフォルトの画像を設定。",
      };
    }

    // アップロード用ファイルパス作成
    const imageFileName = crypto.randomUUID();
    const imageFileExtName = path.extname(imageFile[0].name).toLowerCase();
    const uploadFilePath = `${userId}/bikes/${imageFileName}${imageFileExtName}`;

    // ストレージにアップロード
    const { error } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET as string)
      .upload(uploadFilePath, imageFile[0], {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new Error(`ストレージエラー | message: ${error.message}`);
    }

    // アップロード先のURLを取得
    const { data } = supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET as string)
      .getPublicUrl(uploadFilePath);

    return {
      success: true,
      message: "画像のアップロードに成功しました。",
      result: data.publicUrl,
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
