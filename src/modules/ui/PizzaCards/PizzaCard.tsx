import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import { IPizzaDataSingle } from "@/store/pizza.interface";
import Link from "next/link";
interface CardsProps extends IPizzaDataSingle {
  onAddToCart: () => void;
}

const PizzaCard: React.FC<CardsProps> = ({ pizza, onAddToCart }) => {
  return (
    <>
      <div className={styles.Card}>
        <Link href={`/pizza/${pizza.id}`}>
          <div className={styles.Image}>
            {pizza.image && pizza.image.trim() !== "" ? (
              <Image
                src={pizza.image}
                alt={pizza.name || "Пицца"}
                width={221}
                height={221}
              />
            ) : (
              <Image
                src="/placeholder.png"
                alt="Пицца не найдена"
                width={221}
                height={221}
              />
            )}
          </div>
        </Link>
        <div className={styles.textCard}>
          <h1 className={styles.name}>{pizza.name}</h1>
          <p className={styles.description}>{pizza.description}</p>
          <div className={styles.bottomWrapper}>
            <h3 className={styles.price}>От {pizza.price} ₽</h3>
            <button className={styles.addBtn} onClick={onAddToCart}>
              + Добавить
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PizzaCard;
