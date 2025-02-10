export interface IPizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
  doughOptions: string[];
  customizable: boolean;
}

export interface IPizzaStore {
  pizzas: IPizza[];
  fetchPizzas: () => Promise<void>;
  category: string;
  setCategory: (category: string) => void;
  sort: string;
  setSort: (sort: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedIngredients: string[];
  toggleIngredient: (ingredient: string) => void;
  doughType: string;
  setDoughType: (type: string) => void;
}
