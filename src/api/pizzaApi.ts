// демо api что бы было переделаю 
import axios from 'axios';
import { IPizza } from '@/store/interface';

const API_URL = 'https://67a9bad96e9548e44fc49a95.mockapi.io/pizza';

export const fetchPizzas = async (): Promise<IPizza[]> => {
  try {
    const response = await axios.get(API_URL);
    
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error('Некорректный формат данных, полученных от API');
    }
  } catch (error) {
    console.error('Ошибка при запросе пицц:', error);
    throw error;
  }
};

