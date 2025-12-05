"use client";

import { Loading } from "@/components";
import { useBikeDeleteFormStore } from "./stores";
import BikeDeleteFormForm from "./BikeDeleteFormForm";

export default function BikeDeleteForm() {
  const { getBikeResponse, isLoadingGetBike } = useBikeDeleteFormStore();

  return (
    <>
      {isLoadingGetBike ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : getBikeResponse.status === "success" ? (
        getBikeResponse.result ? (
          <BikeDeleteFormForm bikeId={getBikeResponse.result.id} />
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
