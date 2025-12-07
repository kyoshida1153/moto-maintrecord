import { create } from "zustand";
import type { BikeSelect } from "@/app/api/bikes/route";

type GetBikesResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: BikeSelect[];
};

type BikeCardListState = {
  getBikesResponse: GetBikesResponse;
  setGetBikesResponse: (getBikesResponse: GetBikesResponse) => void;

  isLoadingBikeList: boolean;
  setIsLoadingBikeList: (isLoadingGetBikes: boolean) => void;
};

export const useBikeCardListStore = create<BikeCardListState>((set) => ({
  getBikesResponse: {
    status: undefined,
    message: "",
  },
  setGetBikesResponse: (nextValue) =>
    set(() => ({
      getBikesResponse: nextValue,
    })),

  isLoadingBikeList: true,
  setIsLoadingBikeList: (nextValue) =>
    set(() => ({
      isLoadingBikeList: nextValue,
    })),
}));
