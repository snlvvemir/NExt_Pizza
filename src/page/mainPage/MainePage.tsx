"use client";

import React, { useEffect, useState } from "react";
import styles from "./mainePage.module.scss";
import TopFilter from "@/components/filterPizza/topFilter/TopFilter";
import PizzaCard from "@/modules/ui/PizzaCards";
import SidebarFilter from "@/components/filterPizza/sidebarFilter/SidebarFilter";
import { fetchPizzas } from "@/api/pizzaApi";
import { IPizza } from "@/store/interface";

const ITEMS_PER_PAGE = 6;

const MainePage = () => {
  const [pizzas, setPizzas] = useState<IPizza[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  const totalPages = Math.ceil(pizzas.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedPizzas = pizzas.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <TopFilter />
      <div className={styles.Wrapper}>
        <SidebarFilter />
        <div>
          <div className={styles.Cards}>
            {displayedPizzas.map((pizza) => (
              <PizzaCard
                key={pizza.id}
                image={pizza.image}
                name={pizza.name}
                description={pizza.description}
                price={pizza.price}
              />
            ))}
          </div>

          {/* Пагинация */}
          <div className={styles.Pagination}>
            <button
              className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ""}`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 3).map((page) => (
              <button
                key={page}
                className={`${styles.pageButton} ${currentPage === page ? styles.active : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ""}`}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>

            <span className={styles.pageInfo}>
              {startIndex + displayedPizzas.length} из {pizzas.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainePage;
