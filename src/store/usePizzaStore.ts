import { create } from "zustand";
import { fetchPizzas } from "../api/pizzaApi";
import { IPizzaStore } from "./interface";

export const usePizzaStore = create<IPizzaStore>((set) => ({
  pizzas: [],
  fetchPizzas: async () => {
    try {
      const pizzas = await fetchPizzas();
      console.log("Обновленные пиццы в хранилище:", pizzas); // Логируем пиццы, полученные с API
      set({ pizzas });
    } catch (error) {
      console.error("Ошибка загрузки пицц в хранилище:", error);
    }
  },

  category: "Все",
  setCategory: (category) => set({ category }),

  sort: "рейтинг",
  setSort: (sort) => set({ sort }),

  priceRange: [0, 1950],
  setPriceRange: (range) => set({ priceRange: range }),

  selectedIngredients: [],
  toggleIngredient: (ingredient) =>
    set((state) => ({
      selectedIngredients: state.selectedIngredients.includes(ingredient)
        ? state.selectedIngredients.filter((i) => i !== ingredient)
        : [...state.selectedIngredients, ingredient],
    })),

  doughType: "Традиционное",
  setDoughType: (type) => set({ doughType: type }),
}));
