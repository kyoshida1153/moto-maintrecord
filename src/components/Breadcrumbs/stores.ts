import { create } from "zustand";

type GetBreadcrumbItems =
  | {
      href?: string;
      text: string;
    }[]
  | undefined;

type BreadcrumbsState = {
  getBreadcrumbItems: GetBreadcrumbItems;
  setBreadcrumbItems: (getBreadcrumbItems: GetBreadcrumbItems) => void;

  isLoadingGetBreadcrumbItems: boolean;
  setIsLoadingGetBreadcrumbItems: (
    isLoadingGetBreadcrumbItems: boolean,
  ) => void;
};

export const useBreadcrumbsStore = create<BreadcrumbsState>((set) => ({
  getBreadcrumbItems: undefined,
  setBreadcrumbItems: (nextValue) =>
    set(() => ({
      getBreadcrumbItems: nextValue,
    })),

  isLoadingGetBreadcrumbItems: true,
  setIsLoadingGetBreadcrumbItems: (nextValue) =>
    set(() => ({
      isLoadingGetBreadcrumbItems: nextValue,
    })),
}));
