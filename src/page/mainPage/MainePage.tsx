"use client";

import React, { useState, useEffect } from "react";
import styles from "./mainePage.module.scss";
import TopFilter from "@/components/filterPizza/topFilter/TopFilter";
import PizzaCard from "@/modules/ui/PizzaCards";
import SidebarFilter from "@/components/filterPizza/sidebarFilter/SidebarFilter";
import Pagination from "./pagination";
import Modal from "@/components/ModalPizza";
import { fetchPizzas } from "@/api/pizzaApi";
import { IPizza } from "@/store/interface";
import Image from "next/image";

const LIMIT = 6;

interface CartItem extends IPizza {
  size: string;
  dough: string;
  toppings: string[];
  quantity: number;
  totalPrice: number;
  image: string;
}

const MainePage = () => {
  const [pizzas, setPizzas] = useState<IPizza[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedPizza, setSelectedPizza] = useState<IPizza | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

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

  const handleAddToCart = (pizza: IPizza) => {
    setSelectedPizza(pizza);
    setSelectedPrice(pizza.price);
  };

  const confirmAddToCart = (size: string, dough: string, toppings: string[], totalPrice: number) => {
    if (selectedPizza) {
      setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex(
          (item) =>
            item.id === selectedPizza.id && item.size === size && item.dough === dough
        );

        if (existingItemIndex !== -1) {
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex].quantity += 1;
          updatedCart[existingItemIndex].totalPrice += totalPrice;
          return updatedCart;
        } else {
          return [
            ...prevCart,
            { ...selectedPizza, size, dough, toppings, quantity: 1, totalPrice, image: selectedPizza.image },
          ];
        }
      });
      setSelectedPizza(null);
    }
  };

  const updateQuantity = (index: number, change: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item, idx) =>
        idx === index ? { ...item, quantity: item.quantity + change, totalPrice: item.totalPrice + change * (item.totalPrice / item.quantity) } : item
      ).filter(item => item.quantity > 0);
      return updatedCart;
    });
  };

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
              onAddToCart={() => handleAddToCart(pizza)}
            />
          ))}
        </div>
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <Modal
        isOpen={!!selectedPizza}
        title={selectedPizza?.name}
        price={selectedPrice}
        image={selectedPizza?.image}
        onConfirm={(size, dough, toppings) => {
          const totalPrice = selectedPrice;
          confirmAddToCart(size, dough, toppings, totalPrice);
        }}
        onClose={() => setSelectedPizza(null)}
      />

      {/* Корзина */}
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
                {pizza.toppings.length > 0 && (
                  <span> (Добавки: {pizza.toppings.join(", ")})</span>
                )}
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

export default MainePage;