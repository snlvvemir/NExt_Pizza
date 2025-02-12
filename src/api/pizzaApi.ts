
import axios from "axios";
import { IPizza } from "@/store/pizza.interface";

const API_URL = "https://67a9bad96e9548e44fc49a95.mockapi.io/pizza";

export const fetchPizzas = async (page: number, limit: number) => {
  try {
    console.log(`Запрашиваю данные с API: страница ${page}, лимит ${limit}`);
    
    const response = await axios.get<IPizza[]>(`${API_URL}?page=${page}&limit=${limit}`);
    const totalResponse = await axios.get<IPizza[]>(API_URL);
    const totalItems = totalResponse.data.length;

    console.log("Ответ с API:", response.data);
    console.log("Общее количество пицц:", totalItems);

    return { data: response.data, total: totalItems };
  } catch (error) {
    throw new Error("Ошибка при загрузке данных");
  }
};
