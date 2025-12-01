"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Loading } from "@/components";
import { getBike } from "@/lib/api";
import BikeEditFormForm from "./BikeEditFormForm";
import { useBikeEditFormStore } from "./stores";

export default function BikeEditForm() {
  const params = useParams<{ id: string }>();
  const bikeId = params.id;

  const { setGetBikeResponse } = useBikeEditFormStore();

  // 各データの読み込み～stateにセット
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedStatus, setLoadedStatus] = useState<
    "success" | "error" | undefined
  >(undefined);

  // フォームのdefaultValueに設定するデータの読み込み
  useEffect(() => {
    Promise.all([getBike(bikeId)]).then((values) => {
      setGetBikeResponse({
        status: values[0].success === true ? "success" : "error",
        message: values[0].message,
        result: values[0].result,
      });
      setLoadedStatus("success");
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
        <BikeEditFormForm />
      ) : (
        <p>読み込みに失敗しました。</p>
      )}
    </>
  );
}
