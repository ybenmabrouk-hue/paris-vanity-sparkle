import { create } from "zustand";

interface BannerStore {
  color: string | null;
  textColor: string | null;
  setColor: (bg: string | null, fg?: string | null) => void;
}

export const useBannerStore = create<BannerStore>((set) => ({
  color: null,
  textColor: null,
  setColor: (bg, fg = null) => set({ color: bg, textColor: fg }),
}));
