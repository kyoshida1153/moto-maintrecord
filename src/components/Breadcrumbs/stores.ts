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

  isLoadingBreadcrumbs: boolean;
  setIsLoadingBreadcrumbs: (isLoadingBreadcrumbs: boolean) => void;
};

export const useBreadcrumbsStore = create<BreadcrumbsState>((set) => ({
  getBreadcrumbItems: undefined,
  setBreadcrumbItems: (nextValue) =>
    set(() => ({
      getBreadcrumbItems: nextValue,
    })),

  isLoadingBreadcrumbs: true,
  setIsLoadingBreadcrumbs: (nextValue) =>
    set(() => ({
      isLoadingBreadcrumbs: nextValue,
    })),
}));
