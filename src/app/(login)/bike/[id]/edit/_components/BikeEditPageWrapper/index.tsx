"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { getBike } from "@/lib/api";
import { useBikeEditFormStore } from "../BikeEditForm/stores";

export default function BikeEditPageWrapper({
  children,
  bikeId,
}: {
  children: React.ReactNode;
  bikeId: string;
}) {
  const { setGetBikeResponse, setIsLoadingGetBike } = useBikeEditFormStore();
  const { setBreadcrumbItems, setIsLoadingGetBreadcrumbItems } =
    useBreadcrumbsStore();

  useEffect(() => {
    (async () => {
      const response = await getBike(bikeId);

      setGetBikeResponse({
        status: response.success === true ? "success" : "error",
        message: response.message,
        result: response.result,
      });
      setIsLoadingGetBike(false);

      setBreadcrumbItems([
        {
          text: "所有バイク",
          href: "/bike",
        },
        {
          text: response?.result?.name ?? "データ無し",
          href: response?.result?.id
            ? `/bike/${response?.result?.id}`
            : undefined,
        },
        {
          text: "編集",
        },
      ]);
      setIsLoadingGetBreadcrumbItems(false);
    })();
  }, [
    bikeId,
    setGetBikeResponse,
    setIsLoadingGetBike,
    setBreadcrumbItems,
    setIsLoadingGetBreadcrumbItems,
  ]);

  return <>{children}</>;
}
