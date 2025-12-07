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

  isLoadingBikeEditForm: boolean;
  setIsLoadingBikeEditForm: (isLoadingGetBike: boolean) => void;
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

  isLoadingBikeEditForm: true,
  setIsLoadingBikeEditForm: (nextValue) =>
    set(() => ({
      isLoadingBikeEditForm: nextValue,
    })),
}));
