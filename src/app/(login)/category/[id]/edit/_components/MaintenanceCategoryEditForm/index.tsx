"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Loading } from "@/components";
import { getMaintenanceCategory } from "@/lib/api";
import MaintenanceCategoryEditFormForm from "./MaintenanceCategoryEditFormForm";
import { useMaintenanceCategoryEditFormStore } from "./stores";

export default function MaintenanceCategoryEditForm() {
  const params = useParams<{ id: string }>();
  const maintenanceCategoryId = params.id;

  const { setGetMaintenanceCategoryResponse } =
    useMaintenanceCategoryEditFormStore();

  // 各データの読み込み～stateにセット
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedStatus, setLoadedStatus] = useState<
    "success" | "error" | undefined
  >(undefined);

  // フォームのdefaultValueに設定するデータの読み込み
  useEffect(() => {
    Promise.all([getMaintenanceCategory(maintenanceCategoryId)]).then(
      (values) => {
        setGetMaintenanceCategoryResponse({
          status: values[0].success === true ? "success" : "error",
          message: values[0].message,
          result: values[0].result,
        });
        setLoadedStatus("success");
        setIsLoading(false);
      },
    );
  }, [setGetMaintenanceCategoryResponse, maintenanceCategoryId]);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : loadedStatus === "success" ? (
        <MaintenanceCategoryEditFormForm />
      ) : (
        <p>読み込みに失敗しました。</p>
      )}
    </>
  );
}
