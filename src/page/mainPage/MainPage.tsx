"use client";

import React, { useEffect, useState } from "react";
import styles from "./mainePage.module.scss";
import TopFilter from "@/components/filterPizza/topFilter/TopFilter";
import SidebarFilter from "@/components/filterPizza/sidebarFilter/SidebarFilter";
import Pagination from "@/components/pagination/pagination";
import PizzaList from "@/components/pizzaList/PizzaList";
import Modal from "@/components/ModalPizza";
import { fetchPizzas } from "@/api/pizzaApi";
import { IPizza } from "@/store/pizza.interface";
import Image from "next/image";
import PizzaCard from "@/modules/ui/PizzaCards/PizzaCard";

const LIMIT = 6;

interface CartItem extends IPizza {
  size: string;
  dough: string;
  toppings: string[];
  quantity: number;
  totalPrice: number;
}

const MainPage = () => {
  const [pizzas, setPizzas] = useState<IPizza[]>([]);
  const [filteredPizzas, setFilteredPizzas] = useState<IPizza[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedPizza, setSelectedPizza] = useState<IPizza | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [category, setCategory] = useState<string>("Все");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sort, setSort] = useState<string>("рейтинг");

  useEffect(() => {
    const loadPizzas = async () => {
      try {
        const { data, total } = await fetchPizzas(page, LIMIT);
        setPizzas(data);
        setTotalPages(Math.ceil(total / LIMIT));
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
      }
    };
    loadPizzas();
  }, [page]);

  useEffect(() => {
    const filtered = pizzas.filter((pizza) => {
      const categoryMatch = category === "Все" || pizza.category === category;
      const priceMatch = pizza.price >= priceRange[0] && pizza.price <= priceRange[1];
      return categoryMatch && priceMatch;
    });

    const sortedPizzas = filtered.sort((a, b) => (sort === "рейтинг" ? b.rating - a.rating : 0));
    setFilteredPizzas(sortedPizzas);
  }, [pizzas, category, priceRange, sort]);

  const handleAddToCart = (pizza: IPizza) => {
    setSelectedPizza(pizza);
    setSelectedPrice(pizza.price);
  };

  const confirmAddToCart = (size: string, dough: string, toppings: string[], totalPrice: number) => {
    if (selectedPizza) {
      setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex(
          (item) => item.id === selectedPizza.id && item.size === size && item.dough === dough
        );

        if (existingItemIndex !== -1) {
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex].quantity += 1;
          updatedCart[existingItemIndex].totalPrice += totalPrice;
          return updatedCart;
        } else {
          return [...prevCart, { ...selectedPizza, size, dough, toppings, quantity: 1, totalPrice }];
        }
      });
      setSelectedPizza(null);
    }
  };

  const updateQuantity = (index: number, change: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item, idx) =>
          idx === index
            ? { ...item, quantity: item.quantity + change, totalPrice: item.totalPrice + change * (item.totalPrice / item.quantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div>
      <TopFilter/>
      <div className={styles.Wrapper}>
        <SidebarFilter />
        <PizzaList pizzas={filteredPizzas.slice((page - 1) * LIMIT, page * LIMIT)} onAddToCart={handleAddToCart} />
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <Modal
        isOpen={!!selectedPizza}
        title={selectedPizza?.name}
        price={selectedPrice}
        image={selectedPizza?.image}
        onConfirm={(size, dough, toppings) => confirmAddToCart(size, dough, toppings, selectedPrice)}
        onClose={() => setSelectedPizza(null)}
      />

      <div className={styles.cart}>
        <h2>Корзина</h2>
        {cart.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          <ul>
            {cart.map((pizza, index) => (
              <li key={index} className={styles.cartItem}>
                <Image src={pizza.image} width={50} height={50} alt={pizza.name} className={styles.cartImage} />
                {`${pizza.name} — ${pizza.size}, ${pizza.dough}, ${pizza.totalPrice}₽ x ${pizza.quantity}`}
                {pizza.toppings.length > 0 && <span> (Добавки: {pizza.toppings.join(", ")})</span>}
                <button onClick={() => updateQuantity(index, 1)}>+</button>
                <button onClick={() => updateQuantity(index, -1)}>-</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MainPage;
