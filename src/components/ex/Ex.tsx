"use client"
import React, { useEffect, useState } from 'react';
import { IPizza } from '@/store/interface';
import { fetchPizzas } from '@/api/pizzaApi';

const PizzaList: React.FC = () => {
  const [pizzas, setPizzas] = useState<IPizza[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPizzas = async () => {
      try {
        const fetchedPizzas = await fetchPizzas();
        setPizzas(fetchedPizzas);
      } catch (err) {
        setError('Не удалось загрузить пиццы.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPizzas();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Список пицц</h1>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza.id}>
            <h2>{pizza.name}</h2>
            <p>{pizza.description}</p>
            <p>Цена: {pizza.price} сом</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PizzaList;
