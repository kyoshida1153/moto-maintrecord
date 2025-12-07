"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { getBike } from "@/lib/api";
import { useBikeDetailStore } from "../BikeDetail/stores";

export default function BikeDetailPageWrapper({
  children,
  bikeId,
}: {
  children: React.ReactNode;
  bikeId: string;
}) {
  const { setBreadcrumbItems, setIsLoadingBreadcrumbs } = useBreadcrumbsStore();
  const { setGetBikeResponse, setIsLoadingBikeDetail } = useBikeDetailStore();

  useEffect(() => {
    // 各コンポーネントを読み込み中にする
    setIsLoadingBreadcrumbs(true);
    setIsLoadingBikeDetail(true);

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
        },
      ]);

      // 各コンポーネントを読み込み完了にする
      setIsLoadingBreadcrumbs(false);
      setIsLoadingBikeDetail(false);
    })();
  }, [
    bikeId,
    setGetBikeResponse,
    setIsLoadingBikeDetail,
    setBreadcrumbItems,
    setIsLoadingBreadcrumbs,
  ]);

  return <>{children}</>;
}
