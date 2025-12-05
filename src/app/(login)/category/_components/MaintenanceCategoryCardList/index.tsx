"use client";

import { Loading } from "@/components";
import MaintenanceCategoryCard from "./MaintenanceCategoryCard";
import { useMaintenanceCategoryCardListStore } from "./stores";

export default function MaintenanceCategoryCardList() {
  const {
    getMaintenanceCategoriesResponse,
    isLoadingGetMaintenanceCategories,
  } = useMaintenanceCategoryCardListStore();

  return (
    <>
      {isLoadingGetMaintenanceCategories ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : getMaintenanceCategoriesResponse.status === "success" ? (
        Array.isArray(getMaintenanceCategoriesResponse.result) &&
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
