"use client";

import React, { useEffect, useState } from "react";
import styles from "./mainePage.module.scss";
import TopFilter from "@/components/filterPizza/topFilter/TopFilter";
import PizzaCard from "@/modules/ui/PizzaCards";
import SidebarFilter from "@/components/filterPizza/sidebarFilter/SidebarFilter";
import { fetchPizzas } from "@/api/pizzaApi"; // Импорт запроса к API
import { IPizza } from "@/store/interface";

const MainePage = () => {
  const [pizzas, setPizzas] = useState<IPizza[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPizzas = async () => {
      try {
        const fetchedPizzas = await fetchPizzas();
        setPizzas(fetchedPizzas);
      } catch (err) {
        setError("Не удалось загрузить пиццы.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPizzas();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <TopFilter />
      <div className={styles.Wrapper}>
        <SidebarFilter />
        <div className={styles.Cards}>
          {pizzas.slice(0, 6).map((pizza) => (
            <PizzaCard
              image={pizza.image}
              key={pizza.id}
              name={pizza.name}
              description={pizza.description}
              price={pizza.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainePage;
