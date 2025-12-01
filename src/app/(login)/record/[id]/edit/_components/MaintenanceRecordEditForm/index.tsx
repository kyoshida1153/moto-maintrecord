"use client";

import { useEffect, useState } from "react";
import { Loading } from "@/components";
import {
  getBikes,
  getMaintenanceCategories,
  getMaintenanceRecord,
} from "@/lib/api";
import { useMaintenanceRecordEditFormState } from "./stores";
import MaintenanceRecordEditFormForm from "./MaintenanceRecordEditFormForm";

import { useParams } from "next/navigation";

export default function MaintenanceRecordEditForm() {
  const params = useParams<{ id: string }>();
  const maintenanceRecordId = params.id;

  const {
    setGetBikesResponse,
    setGetMaintenanceCategoriesResponse,
    setGetMaintenanceRecordResponse,
  } = useMaintenanceRecordEditFormState();

  // 各データの読み込み～stateにセット
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedStatus, setLoadedStatus] = useState<
    "success" | "error" | undefined
  >(undefined);

  useEffect(() => {
    Promise.all([
      getBikes(),
      getMaintenanceCategories(),
      getMaintenanceRecord(maintenanceRecordId),
    ]).then((values) => {
      setGetBikesResponse({
        status: values[0].success === true ? "success" : "error",
        message: values[0].message,
        result: values[0].result,
      });
      setGetMaintenanceCategoriesResponse({
        status: values[1].success === true ? "success" : "error",
        message: values[1].message,
        result: values[1].result,
      });
      setGetMaintenanceRecordResponse({
        status: values[2].success === true ? "success" : "error",
        message: values[2].message,
        result: values[2].result,
      });
      setLoadedStatus("success");
      setIsLoading(false);
    });
  }, [
    maintenanceRecordId,
    setGetBikesResponse,
    setGetMaintenanceCategoriesResponse,
    setGetMaintenanceRecordResponse,
  ]);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : loadedStatus === "success" ? (
        <MaintenanceRecordEditFormForm />
      ) : (
        <p>読み込みに失敗しました。</p>
      )}
    </>
  );
}
