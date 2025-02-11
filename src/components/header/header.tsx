"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import MainIcon from "./svg/icon_pizza.svg";
import SearchVector from "./svg/search_vector.svg";
import SignInIcon from "./svg/sign_in_icon.svg";
import ShoppingCartIcon from "./svg/shopping_cart.svg";
import CloseIcon from "./svg/close_icon.svg";
import { fetchPizzas } from "@/api/pizzaApi";
import { IPizza } from "@/store/interface";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pizzas, setPizzas] = useState<IPizza[]>([]);
  const [filteredPizzas, setFilteredPizzas] = useState<IPizza[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadPizzas = async () => {
      try {
        const { data } = await fetchPizzas(1, 100);
        setPizzas(data);
      } catch (error) {
        console.error("Ошибка при загрузке пицц:", error);
      }
    };
    loadPizzas();
  }, []);

  useEffect(() => {
    const results = pizzas.filter((pizza) =>
      pizza.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPizzas(results);
  }, [searchTerm, pizzas]);

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      {/* Затемняющий фон (только если корзина или поиск активны) */}
      {(searchTerm || isCartOpen) && <div className={styles.overlay} onClick={closeCart}></div>}

      <header className={`${styles.header} ${isCartOpen ? styles.disabled : ""}`}>
        <div className={styles.headerWrapper}>
          {/* Логотип */}
          <div className={styles.iconContainer}>
            <Image className={styles.icon} src={MainIcon} alt="Главная иконка" />
            <div>
              <h1 className={styles.iconText1}>NEXT PIZZA</h1>
              <h2 className={styles.iconText2}>вкусней уже некуда</h2>
            </div>
          </div>

          {/* Поле поиска */}
          <div className={`${styles.search} ${isCartOpen && !searchTerm ? styles.searchDimmed : ""}`}>
            <Image className={styles.searchVector} src={SearchVector} alt="Иконка поиска" />
            <input
              placeholder="Поиск пиццы..."
              className={styles.input}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isCartOpen} // Отключаем ввод при открытой корзине
            />
            {searchTerm && (
              <div className={styles.searchResults}>
                {filteredPizzas.map((pizza) => (
                  <div key={pizza.id} className={styles.resultItem}>
                    <div>
                      <Image src={pizza.image} alt={pizza.name} width={40} height={40} />
                    </div>
                    <div className={styles.pizzaText}>
                      <span>{pizza.name}</span>
                      <span className={styles.pizzaprice}>{pizza.price}₽</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Кнопки */}
          <div className={styles.buttons}>
            <button className={styles.signInButton} disabled={isCartOpen}>
              <Image src={SignInIcon} alt="Иконка входа" />
              <h3 className={styles.signInText}>Войти</h3>
            </button>
            <button className={styles.cartButton} onClick={() => setIsCartOpen(true)}>
              <Image src={ShoppingCartIcon} alt="Иконка корзины" />
            </button>
          </div>
        </div>
      </header>

      {/* Модальное окно корзины */}
      <div className={`${styles.cartModal} ${isCartOpen ? styles.cartOpen : ""}`}>
        <button className={styles.closeButton} onClick={closeCart}>
          <Image src={""} alt="Закрыть" />
        </button>
        <h2>Корзина</h2>
        <p>Ваша корзина пуста.</p>
      </div>
    </>
  );
};

export default Header;
