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

  isLoadingGetBikes: boolean;
  setIsLoadingGetBikes: (isLoadingGetBikes: boolean) => void;
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

  isLoadingGetBikes: true,
  setIsLoadingGetBikes: (nextValue) =>
    set(() => ({
      isLoadingGetBikes: nextValue,
    })),
}));
