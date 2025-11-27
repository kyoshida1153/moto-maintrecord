import { create } from "zustand";

type InputFileImageStore = {
  isChangedInputFileImage: boolean;
  setIsChangedInputFileImage: (isChangedInputFileImage: boolean) => void;
};

export const useInputFileImageStore = create<InputFileImageStore>((set) => ({
  isChangedInputFileImage: false,
  setIsChangedInputFileImage: (nextValue) =>
    set(() => ({
      isChangedInputFileImage: nextValue,
    })),
}));
