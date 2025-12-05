"use client";

import { Loading } from "@/components";
import BikeEditFormForm from "./BikeEditFormForm";
import { useBikeEditFormStore } from "./stores";

export default function BikeEditForm() {
  const { getBikeResponse, isLoadingGetBike } = useBikeEditFormStore();

  return (
    <>
      {isLoadingGetBike ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : getBikeResponse.status === "success" ? (
        getBikeResponse.result ? (
          <BikeEditFormForm bikeId={getBikeResponse.result.id} />
        ) : (
          <p>表示できるデータがありませんでした。</p>
        )
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
