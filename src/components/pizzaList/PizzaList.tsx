import { IPizzaData } from '@/store/pizza.interface'
import React, { FC } from 'react'
import styles from './styles.module.scss'
import PizzaCard from '@/modules/ui/PizzaCards/PizzaCard';

interface IPizzaDataList extends IPizzaData{
  onAddToCart?: () => void;
}

const PizzaList: FC<IPizzaDataList> = ({ pizzas, onAddToCart  }) => {
  return (
      <div className={styles.Cards}>
        {pizzas.length > 0 ? (
          pizzas.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} onAddToCart={onAddToCart} />
          ))
        ) : (
          <div>Pizzas not found!</div>
        )}
      </div>
  );
}

export default PizzaList;
