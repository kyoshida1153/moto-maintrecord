"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { useUserDeleteFormStore } from "../UserDeleteForm/stores";
import { getUser } from "@/lib/api";

export default function AccountDeletePageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setBreadcrumbItems, setIsLoadingBreadcrumbs } = useBreadcrumbsStore();
  const { setGetUserResponse, setIsLoadingUserDeleteForm } =
    useUserDeleteFormStore();

  useEffect(() => {
    // 各コンポーネントを読み込み中にする
    setIsLoadingBreadcrumbs(true);
    setIsLoadingUserDeleteForm(true);

    (async () => {
      // 表示に必要なデータの読み込み
      const response = await getUser();

      setGetUserResponse({
        status: response.success === true ? "success" : "error",
        message: response.message,
        defaultValue: response.result,
      });

      // パンくずリストの設定
      setBreadcrumbItems([
        {
          text: "アカウント管理",
          href: "/account",
        },
        {
          text: "アカウントの削除",
        },
      ]);

      // 各コンポーネントを読み込み完了にする
      setIsLoadingBreadcrumbs(false);
      setIsLoadingUserDeleteForm(false);
    })();
  }, [
    setBreadcrumbItems,
    setIsLoadingBreadcrumbs,
    setGetUserResponse,
    setIsLoadingUserDeleteForm,
  ]);

  return <>{children}</>;
}
