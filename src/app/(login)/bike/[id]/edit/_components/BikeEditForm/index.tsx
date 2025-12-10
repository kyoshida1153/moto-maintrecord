"use client";

import { Loading } from "@/components";
import BikeEditFormForm from "./BikeEditFormForm";
import { useBikeEditFormStore } from "./stores";

export default function BikeEditForm() {
  const { isLoadingBikeEditForm } = useBikeEditFormStore();

  return (
    <>
      {isLoadingBikeEditForm ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : (
        <BikeEditFormForm />
      )}
    </>
  );
}
