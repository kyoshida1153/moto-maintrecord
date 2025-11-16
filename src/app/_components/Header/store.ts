import { create } from "zustand";

type GetLoginUserResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: {
    name?: string | null;
    image?: string | null;
  };
};

type HeaderState = {
  getLoginUserResponse: GetLoginUserResponse;
  setGetLoginUserResponse: (getLoginUserResponse: GetLoginUserResponse) => void;
  isLoadingGetLoginUser: boolean;
  setIsLoadingGetLoginUser: (isLoadingGetLoginUser: boolean) => void;
};

const useHeaderStore = create<HeaderState>((set) => ({
  getLoginUserResponse: {
    status: undefined,
    message: "",
  },
  setGetLoginUserResponse: (nextValue) =>
    set(() => ({
      getLoginUserResponse: nextValue,
    })),
  isLoadingGetLoginUser: true,
  setIsLoadingGetLoginUser: (nextValue) =>
    set(() => ({
      isLoadingGetLoginUser: nextValue,
    })),
}));

export default useHeaderStore;
