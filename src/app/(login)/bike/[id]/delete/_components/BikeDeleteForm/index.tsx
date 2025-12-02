"use client";

import { useEffect, useState } from "react";

import { Loading } from "@/components";
import { getBike } from "@/lib/api";
import { useBikeDeleteFormStore } from "./stores";
import BikeDeleteFormForm from "./BikeDeleteFormForm";

export default function BikeDeleteForm({ bikeId }: { bikeId: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedStatus, setLoadedStatus] = useState<
    "success" | "error" | undefined
  >(undefined);

  const { getBikeResponse, setGetBikeResponse } = useBikeDeleteFormStore();

  // 必要なデータの読み込み～セット
  useEffect(() => {
    Promise.all([getBike(bikeId)]).then((values) => {
      setGetBikeResponse({
        status: values[0].success === true ? "success" : "error",
        message: values[0].message,
        result: values[0].result,
      });

      if (values[0].success === true) {
        setLoadedStatus("success");
      } else {
        setLoadedStatus("error");
      }

      setIsLoading(false);
    });
  }, [setGetBikeResponse, bikeId]);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : loadedStatus === "success" ? (
        <BikeDeleteFormForm bikeId={bikeId} />
      ) : (
        <p>
          {getBikeResponse.message
            ? getBikeResponse.message
            : "読み込みに失敗しました。"}
        </p>
      )}
    </>
  );
}
