// store/pizzaStore.ts
import { create } from 'zustand';

interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface PizzaStore {
  pizzas: Pizza[];
  setPizzas: (pizzas: Pizza[]) => void;
  category: string;
  setCategory: (category: string) => void;
  sort: string;
  setSort: (sort: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  ingredients: string[];
  toggleIngredient: (ingredient: string) => void;
  doughType: string;
  setDoughType: (type: string) => void;
}

export const usePizzaStore = create<PizzaStore>((set) => ({
  pizzas: [],
  setPizzas: (pizzas) => set({ pizzas }),
  category: 'Все',
  setCategory: (category) => set({ category }),
  sort: 'рейтинг',
  setSort: (sort) => set({ sort }),
  priceRange: [0, 1950],
  setPriceRange: (range) => set({ priceRange: range }),
  ingredients: [],
  toggleIngredient: (ingredient) =>
    set((state) => ({
      ingredients: state.ingredients.includes(ingredient)
        ? state.ingredients.filter((i) => i !== ingredient)
        : [...state.ingredients, ingredient],
    })),
  doughType: 'Традиционное',
  setDoughType: (type) => set({ doughType: type }),
}));
