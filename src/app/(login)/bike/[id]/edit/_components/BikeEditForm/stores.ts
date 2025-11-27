import { create } from "zustand";

import type { BikeSelect } from "@/app/api/bikes/route";

type GetBikeResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: BikeSelect;
};

type BikeEditFormState = {
  getBikeResponse: GetBikeResponse;
  setGetBikeResponse: (getBikeResponse: GetBikeResponse) => void;
  isLoadingGetBike: boolean;
  setIsLoadingGetBike: (isLoadingGetBike: boolean) => void;
};

export const useBikeEditFormStore = create<BikeEditFormState>((set) => ({
  getBikeResponse: {
    status: undefined,
    message: "",
  },
  setGetBikeResponse: (nextValue) =>
    set(() => ({
      getBikeResponse: nextValue,
    })),
  isLoadingGetBike: true,
  setIsLoadingGetBike: (nextValue) =>
    set(() => ({
      isLoadingGetBike: nextValue,
    })),
}));
