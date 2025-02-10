import React from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import MainIcon from '@/components/img/svg/icons8-пицца-96 1.svg'
const Header = () => {
  return (
    <div className='container'>
      <header>
        <div>
            <div>
                <Image src={MainIcon} alt=''/>
                <div className={styles}>
                    <h1>NEXT PIZZA</h1>
                    <h1>вкусней уже некуда</h1>
                </div>
            </div>
        </div>
      </header>
    </div>
  )
}

export default Header
