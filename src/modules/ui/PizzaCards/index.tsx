import { FC } from "react";
import styles from "@/styles/style.module.scss";

interface PizzaCardProps {
  image: string;
  name: string;
  description: string;
  price: number;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const PizzaCard: FC<PizzaCardProps> = ({
  image,
  name,
  description,
  price,
  count,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.footer}>
        <span className={styles.price}>от {price} ₽</span>
        <div className={styles.counter}>
          <button onClick={onDecrement} className={styles.button}>
            -
          </button>
          <span className={styles.count}>{count}</span>
          <button onClick={onIncrement} className={styles.button}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
