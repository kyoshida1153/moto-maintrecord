"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { getBike } from "@/lib/api";
import { useBikeDetailStore } from "../BikeDetail/stores";

export default function BikeDetailPageWrapper({
  children,
  bikeId,
}: {
  children: React.ReactNode;
  bikeId: string;
}) {
  const { setGetBikeResponse, setIsLoadingGetBike } = useBikeDetailStore();
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
