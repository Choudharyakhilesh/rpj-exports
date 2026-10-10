import { create } from 'zustand';

type UiState = {
  /** Set once the preloader has handed over to the page (or was skipped). */
  introDone: boolean;
  setIntroDone: () => void;
  /** Product ids pre-selected when the enquiry drawer opens. */
  enquiryProducts: string[];
  setEnquiryProducts: (ids: string[]) => void;
};

export const useUiStore = create<UiState>((set) => ({
  introDone: false,
  setIntroDone: () => set({ introDone: true }),
  enquiryProducts: [],
  setEnquiryProducts: (ids) => set({ enquiryProducts: ids }),
}));
