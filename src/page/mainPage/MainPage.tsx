"use client";

import React, { useEffect, useState } from "react";
import styles from "./mainePage.module.scss";
import TopFilter from "@/components/filterPizza/topFilter/TopFilter";
import SidebarFilter from "@/components/filterPizza/sidebarFilter/SidebarFilter";
import PizzaList from "@/components/pizzaList/PizzaList";
import Pagination from "@/components/pagination/pagination";
import { NextPage } from "next";
import { IPizzaData } from "@/store/pizza.interface";
import { usePizzaStore } from "@/store/usePizzaStore";
import { usePagination } from "@/hooks/usePagination";

const MainPage: NextPage<IPizzaData> = ({ pizzas }) => {
  const { category, priceRange, sort, filteredPizzas, fetchPizzas } = usePizzaStore();
  const { currentPage, setCurrentPage, getPaginatedPizzas } = usePagination(filteredPizzas, 6);

  useEffect(() => {
    fetchPizzas();
  }, [fetchPizzas]);

  useEffect(() => {
    const filtered = pizzas.filter(pizza => {
      const categoryMatch = category === "Все" || pizza.category === category;
      const priceMatch = pizza.price >= priceRange[0] && pizza.price <= priceRange[1];
      return categoryMatch && priceMatch;
    });

    const sortedPizzas = filtered.sort((a, b) => {
      if (sort === "рейтинг") {
        return b.rating - a.rating;
      }
      return 0;
    });

    getPaginatedPizzas(); 
  }, [category, priceRange, sort, pizzas, currentPage, getPaginatedPizzas]);

  return (
    <div>
      <TopFilter />
      <div className={styles.Wrapper}>
        <SidebarFilter />
        <PizzaList pizzas={getPaginatedPizzas()} /> 
      </div>
      <Pagination
        page={currentPage}
        totalPages={Math.ceil(filteredPizzas.length / 6)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default MainPage;
