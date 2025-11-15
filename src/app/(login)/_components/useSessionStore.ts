import { create } from "zustand";
import type { Session } from "next-auth";

type GetSessionResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: Session;
};

type SessionState = {
  getSessionResponse: GetSessionResponse;
  setGetSessionResponse: (getSessionResponse: GetSessionResponse) => void;
  isLoadingGetSession: boolean;
  setIsLoadingGetSession: (isLoadingGetSession: boolean) => void;
};

const useSessionStore = create<SessionState>((set) => ({
  getSessionResponse: {
    status: undefined,
    message: "",
  },
  setGetSessionResponse: (nextValue) =>
    set(() => ({
      getSessionResponse: nextValue,
    })),
  isLoadingGetSession: true,
  setIsLoadingGetSession: (nextValue) =>
    set(() => ({
      isLoadingGetSession: nextValue,
    })),
}));

export default useSessionStore;
