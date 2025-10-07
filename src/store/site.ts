import { create } from "zustand";

type SiteStoreTypes = {
  isSearchBarOpen: boolean;
  setIsSearchBarOpen: (value: boolean) => void;
};

export const useSiteStore = create<SiteStoreTypes>()((set) => ({
  isSearchBarOpen: false,
  setIsSearchBarOpen: (value) => set({ isSearchBarOpen: value }),
}));
