import React from "react";
import Image from "next/image";
import styles from "./styles.module.scss";

import MainIcon from "./svg/icon_pizza.svg";
import SearchVector from "./svg/search_vector.svg";
import SignInIcon from "./svg/sign_in_icon.svg";
import ShoppingCartIcon from "./svg/shopping_cart.svg";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className={styles.iconContainer}>
          <Image className={styles.icon} src={MainIcon} alt="Главная иконка" />
          <div>
            <h1 className={styles.iconText1}>NEXT PIZZA</h1>
            <h2 className={styles.iconText2}>вкусней уже некуда</h2>
          </div>
        </div>
        <div className={styles.search}>
          <Image className={styles.searchVector} src={SearchVector} alt="Иконка поиска" />
          <input
            placeholder="Поиск пиццы..."
            className={styles.input}
            type="text"
          />
        </div>
        <div className={styles.buttons}>
          <button className={styles.signInButton}>
            <Image src={SignInIcon} alt="Иконка входа" />
            <h3 className={styles.signInText}>Войти</h3>
          </button>
          <button className={styles.cartButton}>
            <Image src={ShoppingCartIcon} alt="Иконка корзины" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
