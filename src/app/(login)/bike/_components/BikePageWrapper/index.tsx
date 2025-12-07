"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { getBikes } from "@/lib/api";
import { useBikeCardListStore } from "../BikeList/stores";

export default function BikePageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setGetBikesResponse, setIsLoadingBikeList } = useBikeCardListStore();
  const { setBreadcrumbItems, setIsLoadingBreadcrumbs } = useBreadcrumbsStore();

  useEffect(() => {
    // 各コンポーネントを読み込み中にする
    setIsLoadingBreadcrumbs(true);
    setIsLoadingBikeList(true);

    (async () => {
      // 表示に必要なデータの読み込み
      const response = await getBikes();

      setGetBikesResponse({
        status: response.success === true ? "success" : "error",
        message: response.message,
        result: response.result,
      });

      // パンくずリストの設定
      setBreadcrumbItems([
        {
          text: "所有バイク",
        },
      ]);

      // 各コンポーネントを読み込み完了にする
      setIsLoadingBreadcrumbs(false);
      setIsLoadingBikeList(false);
    })();
  }, [
    setGetBikesResponse,
    setIsLoadingBikeList,
    setBreadcrumbItems,
    setIsLoadingBreadcrumbs,
  ]);

  return <>{children}</>;
}
