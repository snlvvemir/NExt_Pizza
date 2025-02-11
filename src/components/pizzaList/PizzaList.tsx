import PizzaCard from '@/modules/ui/PizzaCards/PizzaCard'
import { IPizzaData } from '@/store/pizza.interface'
import React, { FC } from 'react'
import styles from './styles.module.scss'

const PizzaList: FC<IPizzaData> = ({ pizzas }) => {
  return (
      <div className={styles.Cards}>
        {pizzas.length > 0 ? (
          pizzas.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))
        ) : (
          <div>Pizzas not found!</div>
        )}
      </div>
  );
}

export default PizzaList;
