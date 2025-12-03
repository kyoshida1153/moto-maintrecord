"use client";

import { useEffect, useState } from "react";
import { Loading } from "@/components";
import MaintenanceCategoryCard from "../MaintenanceCategoryCard";
import { getMaintenanceCategories } from "@/lib/api";
import type { MaintenanceCategorySelect } from "@/app/api/maintenance-categories/route";

type GetMaintenanceCategoriesResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: MaintenanceCategorySelect[];
};

export default function MaintenanceCategoryCardList() {
  const [
    getMaintenanceCategoriesResponse,
    setGetMaintenanceCategoriesResponse,
  ] = useState<GetMaintenanceCategoriesResponse>({
    status: undefined,
    message: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedStatus, setLoadedStatus] = useState<
    "success" | "error" | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      const response = await getMaintenanceCategories();
      setGetMaintenanceCategoriesResponse({
        status: response.success === true ? "success" : "error",
        message: response.message,
        result: response.result,
      });

      if (response.success === true) {
        setLoadedStatus("success");
      } else {
        setLoadedStatus("error");
      }

      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : loadedStatus === "success" ? (
        getMaintenanceCategoriesResponse.result &&
        getMaintenanceCategoriesResponse.result.length > 0 ? (
          <div className="my-4 flex flex-col gap-4 md:my-6">
            {getMaintenanceCategoriesResponse.result.map((item) => (
              <MaintenanceCategoryCard
                key={item.id}
                id={item.id}
                name={item.name}
              />
            ))}
          </div>
        ) : (
          <p>カテゴリーはまだ登録されていません。</p>
        )
      ) : (
        <p>
          {getMaintenanceCategoriesResponse.message
            ? getMaintenanceCategoriesResponse.message
            : "読み込みに失敗しました。"}
        </p>
      )}
    </>
  );
}
