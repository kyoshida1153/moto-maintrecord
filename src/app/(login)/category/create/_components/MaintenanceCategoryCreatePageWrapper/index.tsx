"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";

export default function MaintenanceCategoryCreatePageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setBreadcrumbItems, setIsLoadingGetBreadcrumbItems } =
    useBreadcrumbsStore();

  useEffect(() => {
    setBreadcrumbItems([
      {
        text: "カテゴリー",
        href: "/category",
      },
      {
        text: "登録",
      },
    ]);
    setIsLoadingGetBreadcrumbItems(false);
  }, [setBreadcrumbItems, setIsLoadingGetBreadcrumbItems]);

  return <>{children}</>;
}
