"use client";

import { useEffect, useState } from "react";
import { Loading } from "@/components";
import BikeCard from "../BikeCard";
import { getBikes } from "@/lib/api";
import type { BikeSelect } from "@/app/api/bikes/route";

type GetBikesResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: BikeSelect[];
};

export default function BikeCardList() {
  const [getBikesResponse, setGetBikesResponse] = useState<GetBikesResponse>({
    status: undefined,
    message: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedStatus, setLoadedStatus] = useState<
    "success" | "error" | undefined
  >(undefined);

  // 必要なデータの読み込み～セット
  useEffect(() => {
    (async () => {
      const response = await getBikes();
      setGetBikesResponse({
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
        getBikesResponse.result && getBikesResponse.result.length > 0 ? (
          <div className="my-4 flex flex-col gap-4 md:my-6">
            {getBikesResponse.result.map((item) => (
              <BikeCard
                key={item.id}
                id={item.id}
                name={item.name}
                mileage={item.mileage}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        ) : (
          <p>所有バイクはまだ登録されていません。</p>
        )
      ) : (
        <p>
          {getBikesResponse.message
            ? getBikesResponse.message
            : "読み込みに失敗しました。"}
        </p>
      )}
    </>
  );
}
