import { create } from "zustand";

import type { UserUniqueSelect } from "@/app/api/user/route";

type GetUserResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: UserUniqueSelect;
};

type UserNameEditFormState = {
  getUserResponse: GetUserResponse;
  setGetUserResponse: (getUserResponse: GetUserResponse) => void;
};

export const useUserNameEditFormStore = create<UserNameEditFormState>(
  (set) => ({
    getUserResponse: {
      status: undefined,
      message: "",
    },
    setGetUserResponse: (nextValue) =>
      set(() => ({
        getUserResponse: nextValue,
      })),
  }),
);
