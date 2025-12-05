"use client";

import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/components/Breadcrumbs/stores";
import { getBikes } from "@/lib/api";
import { useBikeCardListStore } from "../BikeList/stores";

export default function BikePageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setBreadcrumbItems, setIsLoadingGetBreadcrumbItems } =
    useBreadcrumbsStore();
  const { setGetBikesResponse, setIsLoadingGetBikes } = useBikeCardListStore();

  useEffect(() => {
    (async () => {
      const response = await getBikes();
      setGetBikesResponse({
        status: response.success === true ? "success" : "error",
        message: response.message,
        result: response.result,
      });
      setIsLoadingGetBikes(false);
    })();

    setBreadcrumbItems([
      {
        text: "所有バイク",
      },
    ]);
    setIsLoadingGetBreadcrumbItems(false);
  }, [
    setGetBikesResponse,
    setIsLoadingGetBikes,
    setBreadcrumbItems,
    setIsLoadingGetBreadcrumbItems,
  ]);

  return <>{children}</>;
}
