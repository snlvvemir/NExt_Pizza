"use client";

import React, { useEffect, useState } from "react";
import styles from "./mainePage.module.scss";
import TopFilter from "@/components/filterPizza/topFilter/TopFilter";
import PizzaCard from "@/modules/ui/PizzaCards";
import SidebarFilter from "@/components/filterPizza/sidebarFilter/SidebarFilter";
import Pagination from "./pagination"; 
import { fetchPizzas } from "@/api/pizzaApi";
import { IPizza } from "@/store/interface";

const LIMIT = 6;

const MainePage = () => {
  const [pizzas, setPizzas] = useState<IPizza[]>([]);
  const [newPizzas, setNewPizzas] = useState<IPizza[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const loadPizzas = async () => {
      setLoading(true);
      try {
        const { data, total } = await fetchPizzas(page, LIMIT);
        setNewPizzas(data); // Загружаем новые данные
        setTotalPages(Math.ceil(total / LIMIT));
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPizzas();
  }, [page]);

  // Плавное обновление данных после загрузки
  useEffect(() => {
    if (!loading && newPizzas.length) {
      setPizzas(newPizzas);
    }
  }, [loading, newPizzas]);

  return (
    <div>
      <TopFilter />
      <div className={styles.Wrapper}>
        <SidebarFilter />
        <div className={styles.Cards}>
          {pizzas.map((pizza) => (
            <PizzaCard
              key={pizza.id}
              image={pizza.image}
              name={pizza.name}
              description={pizza.description}
              price={pizza.price}
            />
          ))}
        </div>
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default MainePage;