"use client";

import { Loading } from "@/components";
import BikeListCard from "./BikeListCard";
import { useBikeCardListStore } from "./stores";

export default function BikeList() {
  const { getBikesResponse, isLoadingBikeList } = useBikeCardListStore();

  return (
    <>
      {isLoadingBikeList ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : getBikesResponse.status === "success" ? (
        Array.isArray(getBikesResponse.result) &&
        getBikesResponse.result.length > 0 ? (
          <div className="my-4 flex flex-col gap-4 md:my-6">
            {getBikesResponse.result.map((item) => (
              <BikeListCard
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
