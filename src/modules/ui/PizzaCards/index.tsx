import React from 'react'
import styles from './style.module.scss'
import pizzaImg1 from '@/img/pizza 1.svg'
import pizzaImg2 from '@/img/pizza 2.svg'
import pizzaImg3 from '@/img/pizza 3.svg'
import Image from 'next/image'

interface CardsProps {
  image: string,
  name: string,
  description: string,
  price: number
}
const PizzaCard: React.FC<CardsProps> = ({ image, name, description, price }) => {
  return (
    <div className={styles.Card}>
      <div className={styles.Image}>
        <Image src={image} alt=''/>
      </div>
      <div className={styles.textCard}>
      <h1 className={styles.name}>{name}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.bottomWrapper}>
        <h3 className={styles.price}>От {price} ₽</h3>
        <button className={styles.addBtn}>+ Добавить</button>
      </div>
      </div>
      
    </div>
  )
}

export default PizzaCard

