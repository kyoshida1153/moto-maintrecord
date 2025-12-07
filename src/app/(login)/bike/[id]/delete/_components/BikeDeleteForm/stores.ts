import { create } from "zustand";
import type { BikeUniqueSelect } from "@/app/api/bikes/[id]/route";

type GetBikeResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: BikeUniqueSelect;
};

type BikeDeleteFormState = {
  getBikeResponse: GetBikeResponse;
  setGetBikeResponse: (getBikeResponse: GetBikeResponse) => void;

  isLoadingBikeDeleteForm: boolean;
  setIsLoadingBikeDeleteForm: (isLoadingGetBike: boolean) => void;
};

export const useBikeDeleteFormStore = create<BikeDeleteFormState>((set) => ({
  getBikeResponse: {
    status: undefined,
    message: "",
  },
  setGetBikeResponse: (nextValue) =>
    set(() => ({
      getBikeResponse: nextValue,
    })),

  isLoadingBikeDeleteForm: true,
  setIsLoadingBikeDeleteForm: (nextValue) =>
    set(() => ({
      isLoadingBikeDeleteForm: nextValue,
    })),
}));
