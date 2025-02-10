import React from 'react'
import styles from './mainePage.module.scss'
import TopFilter from '@/components/filterPizza/topFilter/TopFilter'
import PizzaCard from '@/modules/ui/PizzaCards'
import PizzaCards from '@/modules/ui/PizzaCards'
import SidebarFilter from '@/components/filterPizza/sidebarFilter/SidebarFilter'
import pizzaImg1 from '@/img/pizza 1.svg'
import pizzaImg2 from '@/img/pizza 2.svg'
import pizzaImg3 from '@/img/pizza 3.svg'

const MainePage = () => {
  const pizza = [
    {
      image: pizzaImg1,
      name: 'Сырный цыпленок',
      description: 'ОЦыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок',
      price: 395
    },
    {
      image: pizzaImg2,
      name: 'Диабло',
      description: 'Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла',
      price: 449
    },
    {
      image: pizzaImg3,
      name: 'Чизбургер-пицца',
      description: 'Мясной соус болоньезе, соус бургер, соленые огурчики, томаты, красный лук, моцарелла',
      price: 399
    },
    {
      image: pizzaImg1,
      name: 'Сырный цыпленок',
      description: 'ОЦыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок',
      price: 395
    },
    {
      image: pizzaImg2,
      name: 'Диабло',
      description: 'Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла',
      price: 449
    },
    {
      image: pizzaImg3,
      name: 'Чизбургер-пицца',
      description: 'Мясной соус болоньезе, соус бургер, соленые огурчики, томаты, красный лук, моцарелла',
      price: 399
    },
  ]
  return (
    <div>
      <TopFilter/>
      <div className={styles.Wrapper}>
      <SidebarFilter/>
      <div className={styles.Cards}>
        {pizza.map((item, id) => (
        <PizzaCard
        image={item.image.src}
        name={item.name}
        description={item.description}
        price={item.price}
        key={id}
        />
      ))}
      </div>
      </div>
    </div>
  )
}

export default MainePage