import { create } from "zustand";
import type { BikeUniqueSelect } from "@/app/api/bikes/[id]/route";

type GetBikeResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: BikeUniqueSelect;
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
