import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import MainIcon from '@/components/img/svg/icons8-пицца-96 1.svg';
import SearchVector from '@/components/img/svg/search_vector.svg'
import SignInIcon from '@/components/img/svg/sign_in_icon.svg'
import ShoppingCartIcon from '@/components/img/svg/shopping_cart.svg'

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
            <div className={styles.IconContainer}>
                <Image className={styles.icon} src={MainIcon} alt=''/>
                <div>
                    <h1 className={styles.IconText1}>NEXT PIZZA</h1>
                    <h1 className={styles.IconText2}>вкусней уже некуда</h1>
                </div>
            </div>
            <div className={styles.search}>
                <Image className={styles.searchVector} src={SearchVector} alt=''/>
                <input placeholder='Поиск пиццы...' className={styles.input} type="text" />
            </div>
            <div className={styles.buttons}>
                <div>
                    <button className={styles.SignInbutton}>
                        <Image src={SignInIcon} alt=''/>
                        <h3 className={styles.SignInText}>Войти</h3>
                    </button>
                </div>
                <div>
                    <button className={styles.CartButton}>
                        <Image src={ShoppingCartIcon} alt='' />
                    </button>
                </div>
            </div>
        </div>
      </header>
    </>
  )
}

export default Header
