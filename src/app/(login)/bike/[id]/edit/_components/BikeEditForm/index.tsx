"use client";

import { useEffect, useState } from "react";

import { Loading } from "@/components";
import { getBike } from "@/lib/api";
import type { BikeUniqueSelect } from "@/app/api/bikes/[id]/route";

import BikeEditFormForm from "./BikeEditFormForm";

type GetBikeResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: BikeUniqueSelect;
};

export default function BikeEditForm({ bikeId }: { bikeId: string }) {
  // フォームのdefaultValueの設定で使うもの
  const [isLoadingGetBike, setIsLoadingGetBike] = useState<boolean>(true);
  const [getBikeResponse, setGetBikeResponse] = useState<GetBikeResponse>({
    status: undefined,
    message: "",
  });

  // フォームのdefaultValueに設定するデータの読み込み
  useEffect(() => {
    (async () => {
      setIsLoadingGetBike(true);
      const response = await getBike(bikeId);
      setGetBikeResponse({
        message: response.message,
        status: response.success === true ? "success" : "error",
        result: response.result,
      });
      setIsLoadingGetBike(false);
    })();
  }, [bikeId]);

  return (
    <>
      {isLoadingGetBike ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : getBikeResponse.status === "success" ? (
        <BikeEditFormForm
          defaultValues={getBikeResponse.result}
          bikeId={bikeId}
        />
      ) : (
        <p>{getBikeResponse.message}</p>
      )}
    </>
  );
}
