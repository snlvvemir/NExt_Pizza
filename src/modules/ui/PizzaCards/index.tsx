import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";

interface CardsProps {
  image: string;
  name: string;
  description: string;
  price: number;
  onAddToCart: () => void;
}

const PizzaCard: React.FC<CardsProps> = ({ image, name, description, price, onAddToCart }) => {
  return (
    <div className={styles.Card}>
      <div className={styles.Image}>
        <Image src={image} alt={name} width={221} height={221} />
      </div>
      <div className={styles.textCard}>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.bottomWrapper}>
          <h3 className={styles.price}>От {price} ₽</h3>
          <button className={styles.addBtn} onClick={onAddToCart}>
            + Добавить
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
