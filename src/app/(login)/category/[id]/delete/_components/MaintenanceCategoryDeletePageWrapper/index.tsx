"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { getMaintenanceCategory } from "@/lib/api";
import { useMaintenanceRecordCategoryDeleteFormStore } from "../MaintenanceCategoryDeleteForm/stores";

export default function MaintenanceCategoryDeletePageWrapper({
  children,
  maintenanceCategoryId,
}: {
  children: React.ReactNode;
  maintenanceCategoryId: string;
}) {
  const {
    setGetMaintenanceCategoryResponse,
    setIsLoadingGetMaintenanceCategory,
  } = useMaintenanceRecordCategoryDeleteFormStore();
  const { setBreadcrumbItems, setIsLoadingGetBreadcrumbItems } =
    useBreadcrumbsStore();

  useEffect(() => {
    (async () => {
      const response = await getMaintenanceCategory(maintenanceCategoryId);

      setGetMaintenanceCategoryResponse({
        status: response.success === true ? "success" : "error",
        message: response.message,
        result: response.result,
      });
      setIsLoadingGetMaintenanceCategory(false);

      setBreadcrumbItems([
        {
          text: "カテゴリー",
          href: "/category",
        },
        {
          text: "削除",
        },
      ]);
      setIsLoadingGetBreadcrumbItems(false);
    })();
  }, [
    maintenanceCategoryId,
    setGetMaintenanceCategoryResponse,
    setIsLoadingGetMaintenanceCategory,
    setBreadcrumbItems,
    setIsLoadingGetBreadcrumbItems,
  ]);

  return <>{children}</>;
}
