"use client";

import { useEffect, useState } from "react";
import { Loading } from "@/components";
import MaintenanceCategoryCard from "../MaintenanceCategoryCard";
import type { MaintenanceCategorySelect } from "@/app/api/maintenance-categories/route";

async function findMaintenanceCategories(): Promise<
  MaintenanceCategorySelect[] | false
> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/maintenance-categories/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (response.ok) {
    const { result: data } = await response.json();
    return data;
  } else {
    return false;
  }
}

export default function MaintenanceCategoryCardList() {
  const [maintenanceCategories, setMaintenanceCategories] = useState<
    MaintenanceCategorySelect[]
  >([]);
  const [isLoadingMaintenanceCategories, setIsLoadingMaintenanceCategories] =
    useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const result = await findMaintenanceCategories();
      setIsLoadingMaintenanceCategories(false);
      if (result) setMaintenanceCategories(result);
    })();
  }, []);

  return (
    <div className="my-4 flex flex-col gap-4 md:my-6">
      {isLoadingMaintenanceCategories ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : maintenanceCategories && maintenanceCategories.length > 0 ? (
        maintenanceCategories?.map((maintenanceCategory) => (
          <MaintenanceCategoryCard
            key={maintenanceCategory.id}
            id={maintenanceCategory.id}
            name={maintenanceCategory.name}
          />
        ))
      ) : (
        <p>カテゴリーはまだ登録されていません。</p>
      )}
    </div>
  );
}
