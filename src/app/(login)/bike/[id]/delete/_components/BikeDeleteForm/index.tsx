"use client";

import { Loading } from "@/components";
import { useBikeDeleteFormStore } from "./stores";
import BikeDeleteFormForm from "./BikeDeleteFormForm";

export default function BikeDeleteForm() {
  const { isLoadingBikeDeleteForm } = useBikeDeleteFormStore();

  return (
    <>
      {isLoadingBikeDeleteForm ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : (
        <BikeDeleteFormForm />
      )}
    </>
  );
}
