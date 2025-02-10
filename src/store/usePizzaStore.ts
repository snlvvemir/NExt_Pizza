import { create } from "zustand";

interface PizzaStore {
  category: string;
  sort: string;
  setCategory: (category: string) => void;
  setSort: (sort: string) => void;
}

export const usePizzaStore = create<PizzaStore>((set) => ({
  category: "Все",
  sort: "рейтинг",
  setCategory: (category) => set({ category }),
  setSort: (sort) => set({ sort }),
}));
