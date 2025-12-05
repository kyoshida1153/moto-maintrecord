"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { getMaintenanceCategories } from "@/lib/api";
import { useMaintenanceCategoryCardListStore } from "../MaintenanceCategoryCardList/stores";

export default function MaintenanceCategoryPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setBreadcrumbItems, setIsLoadingGetBreadcrumbItems } =
    useBreadcrumbsStore();
  const {
    setGetMaintenanceCategoriesResponse,
    setIsLoadingGetMaintenanceCategories,
  } = useMaintenanceCategoryCardListStore();

  useEffect(() => {
    (async () => {
      const response = await getMaintenanceCategories();
      setGetMaintenanceCategoriesResponse({
        status: response.success === true ? "success" : "error",
        message: response.message,
        result: response.result,
      });
      setIsLoadingGetMaintenanceCategories(false);
    })();

    setBreadcrumbItems([
      {
        text: "カテゴリー",
      },
    ]);
    setIsLoadingGetBreadcrumbItems(false);
  }, [
    setGetMaintenanceCategoriesResponse,
    setIsLoadingGetMaintenanceCategories,
    setBreadcrumbItems,
    setIsLoadingGetBreadcrumbItems,
  ]);

  return <>{children}</>;
}
