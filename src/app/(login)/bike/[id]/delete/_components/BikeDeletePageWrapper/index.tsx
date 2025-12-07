"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { useBikeDeleteFormStore } from "../BikeDeleteForm/stores";
import { getBike } from "@/lib/api";

export default function BikeDeletePageWrapper({
  children,
  bikeId,
}: {
  children: React.ReactNode;
  bikeId: string;
}) {
  const { setBreadcrumbItems, setIsLoadingBreadcrumbs } = useBreadcrumbsStore();
  const { setGetBikeResponse, setIsLoadingBikeDeleteForm } =
    useBikeDeleteFormStore();

  useEffect(() => {
    // 各コンポーネントを読み込み中にする
    setIsLoadingBreadcrumbs(true);
    setIsLoadingBikeDeleteForm(true);

    (async () => {
      // 表示に必要なデータの読み込み
      const response = await getBike(bikeId);

      // 表示に必要なデータを各コンポーネント用ストアにセット
      setGetBikeResponse({
        status: response.success === true ? "success" : "error",
        message: response.message,
        result: response.result,
      });

      // パンくずリストの設定
      setBreadcrumbItems([
        {
          text: "所有バイク",
          href: "/bike",
        },
        {
          text: response?.result?.name ?? "データ無し",
          href: response?.result?.id
            ? `/bike/${response?.result?.id}`
            : undefined,
        },
        {
          text: "削除",
        },
      ]);

      // 各コンポーネントを読み込み完了にする
      setIsLoadingBreadcrumbs(false);
      setIsLoadingBikeDeleteForm(false);
    })();
  }, [
    bikeId,
    setGetBikeResponse,
    setIsLoadingBikeDeleteForm,
    setBreadcrumbItems,
    setIsLoadingBreadcrumbs,
  ]);

  return <>{children}</>;
}
