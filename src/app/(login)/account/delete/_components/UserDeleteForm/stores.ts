import { create } from "zustand";
import type { UserUniqueSelect } from "@/app/api/user/route";

type GetUserResponse = {
  status: "success" | "error" | undefined;
  message: string;
  defaultValue?: UserUniqueSelect;
};

type UserDeleteFormState = {
  getUserResponse: GetUserResponse;
  setGetUserResponse: (getUserResponse: GetUserResponse) => void;

  isLoadingUserDeleteForm: boolean;
  setIsLoadingUserDeleteForm: (isLoadingGetBikes: boolean) => void;
};

export const useUserDeleteFormStore = create<UserDeleteFormState>((set) => ({
  getUserResponse: {
    status: undefined,
    message: "",
  },
  setGetUserResponse: (nextValue) =>
    set(() => ({
      getUserResponse: nextValue,
    })),

  isLoadingUserDeleteForm: true,
  setIsLoadingUserDeleteForm: (nextValue) =>
    set(() => ({
      isLoadingUserDeleteForm: nextValue,
    })),
}));
