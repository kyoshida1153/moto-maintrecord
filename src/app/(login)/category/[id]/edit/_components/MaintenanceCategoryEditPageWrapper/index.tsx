"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { getMaintenanceCategory } from "@/lib/api";
import { useMaintenanceCategoryEditFormStore } from "../MaintenanceCategoryEditForm/stores";

export default function MaintenanceCategoryEditPageWrapper({
  children,
  maintenanceCategoryId,
}: {
  children: React.ReactNode;
  maintenanceCategoryId: string;
}) {
  const {
    setGetMaintenanceCategoryResponse,
    setIsLoadingGetMaintenanceCategory,
  } = useMaintenanceCategoryEditFormStore();
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
          text: "編集",
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
