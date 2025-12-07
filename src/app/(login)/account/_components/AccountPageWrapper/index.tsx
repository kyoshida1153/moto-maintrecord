"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { useUserNameEditFormStore } from "../UserNameEditForm/stores";
import { getUser } from "@/lib/api";

export default function AccountPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setBreadcrumbItems, setIsLoadingBreadcrumbs } = useBreadcrumbsStore();
  const { setGetUserResponse, setIsLoadingNameEditForm } =
    useUserNameEditFormStore();

  useEffect(() => {
    // 各コンポーネントを読み込み中にする
    setIsLoadingBreadcrumbs(true);
    setIsLoadingNameEditForm(true);

    (async () => {
      // 表示に必要なデータの読み込み
      const response = await getUser();

      setGetUserResponse({
        status: response.success === true ? "success" : "error",
        message: response.message,
        result: response.result,
      });

      // パンくずリストの設定
      setBreadcrumbItems([
        {
          text: "アカウント管理",
        },
      ]);

      // 各コンポーネントを読み込み完了にする
      setIsLoadingBreadcrumbs(false);
      setIsLoadingNameEditForm(false);
    })();
  }, [
    setBreadcrumbItems,
    setIsLoadingBreadcrumbs,
    setGetUserResponse,
    setIsLoadingNameEditForm,
  ]);

  return <>{children}</>;
}
