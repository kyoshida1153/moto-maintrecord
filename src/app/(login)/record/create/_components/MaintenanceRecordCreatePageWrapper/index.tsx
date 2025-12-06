"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { useMaintenanceRecordCreateFormState } from "../MaintenanceRecordsCreateForm/stores";
import { getBikes, getMaintenanceCategories } from "@/lib/api";

export default function MaintenanceRecordCreatePageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    setGetBikesResponse,
    setGetMaintenanceCategoriesResponse,
    setIsLoadingMaintenanceRecordCreateForm,
  } = useMaintenanceRecordCreateFormState();
  const { setBreadcrumbItems, setIsLoadingGetBreadcrumbItems } =
    useBreadcrumbsStore();

  useEffect(() => {
    setIsLoadingMaintenanceRecordCreateForm(true);
    Promise.all([
      (async () => {
        const response = await getBikes();
        setGetBikesResponse({
          status: response.success === true ? "success" : "error",
          message: response.message,
          result: response.result,
        });
      })(),
      (async () => {
        const response = await getMaintenanceCategories();
        setGetMaintenanceCategoriesResponse({
          status: response.success === true ? "success" : "error",
          message: response.message,
          result: response.result,
        });
      })(),
      (async () => {
        setIsLoadingGetBreadcrumbItems(true);
        setBreadcrumbItems([
          {
            text: "整備・出費記録",
            href: "/record",
          },
          {
            text: "登録",
          },
        ]);
        setIsLoadingGetBreadcrumbItems(false);
      })(),
    ]).then(() => {
      setIsLoadingMaintenanceRecordCreateForm(false);
    });
  }, [
    setGetBikesResponse,
    setGetMaintenanceCategoriesResponse,
    setIsLoadingMaintenanceRecordCreateForm,
    setBreadcrumbItems,
    setIsLoadingGetBreadcrumbItems,
  ]);

  return <>{children}</>;
}
