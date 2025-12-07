"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { getBike } from "@/lib/api";
import { useBikeEditFormStore } from "../BikeEditForm/stores";

export default function BikeEditPageWrapper({
  children,
  bikeId,
}: {
  children: React.ReactNode;
  bikeId: string;
}) {
  const { setGetBikeResponse, setIsLoadingBikeEditForm } =
    useBikeEditFormStore();
  const { setBreadcrumbItems, setIsLoadingBreadcrumbs } = useBreadcrumbsStore();

  useEffect(() => {
    // 各コンポーネントを読み込み中にする
    setIsLoadingBreadcrumbs(true);
    setIsLoadingBikeEditForm(true);

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
          text: "編集",
        },
      ]);

      // 各コンポーネントを読み込み完了にする
      setIsLoadingBreadcrumbs(false);
      setIsLoadingBikeEditForm(false);
    })();
  }, [
    bikeId,
    setGetBikeResponse,
    setIsLoadingBikeEditForm,
    setBreadcrumbItems,
    setIsLoadingBreadcrumbs,
  ]);

  return <>{children}</>;
}
