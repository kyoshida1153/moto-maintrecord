"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { Prisma } from "@prisma/client";
import MaintenanceCategoryCard from "../MaintenanceCategoryCard";

export type MaintenanceCategory = Prisma.MaintenanceCategoryGetPayload<{
  select: {
    id: true;
    name: true;
  };
}>;

async function findMaintenanceCategory(): Promise<
  MaintenanceCategory[] | false
> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/maintenance-category/`,
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
    MaintenanceCategory[]
  >([]);
  const [maintenanceCategoriesLoading, setMaintenanceCategoriesLoading] =
    useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const result = await findMaintenanceCategory();
      setMaintenanceCategoriesLoading(false);

      if (result) {
        setMaintenanceCategories(result);
      }
    })();
  }, []);

  return (
    <div className="my-4 flex flex-col gap-4 md:my-6">
      {maintenanceCategoriesLoading ? (
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
