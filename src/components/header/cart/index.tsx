'use client';

import React from "react";
import Image from "next/image";
import styles from "./style.module.scss"; // Импортируем локальные стили

interface CartProps {
  cart: string[];
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, onClose }) => {
  return (
    <div className={`${styles.cartModal} ${cart.length > 0 ? styles.cartOpen : ""}`}>
      <button className={styles.closeButton} onClick={onClose}>
        <Image src="/icons/close.svg" alt="Закрыть" width={24} height={24} />
      </button>
      <h2 className={styles.headerTitle}>Корзина</h2>

      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul className={styles.cartItemsList}>
          {cart.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
