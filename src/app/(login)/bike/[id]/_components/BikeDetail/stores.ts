import { create } from "zustand";
import type { BikeUniqueSelect } from "@/app/api/bikes/[id]/route";

type GetBikeResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: BikeUniqueSelect;
};

type BikeDetailState = {
  getBikeResponse: GetBikeResponse;
  setGetBikeResponse: (getBikeResponse: GetBikeResponse) => void;

  isLoadingBikeDetail: boolean;
  setIsLoadingBikeDetail: (isLoadingGetBike: boolean) => void;
  // isLoadingGetBike: boolean;
  // setIsLoadingGetBike: (isLoadingGetBike: boolean) => void;
};

export const useBikeDetailStore = create<BikeDetailState>((set) => ({
  getBikeResponse: {
    status: undefined,
    message: "",
  },
  setGetBikeResponse: (nextValue) =>
    set(() => ({
      getBikeResponse: nextValue,
    })),

  isLoadingBikeDetail: true,
  setIsLoadingBikeDetail: (nextValue) =>
    set(() => ({
      isLoadingBikeDetail: nextValue,
    })),
}));
