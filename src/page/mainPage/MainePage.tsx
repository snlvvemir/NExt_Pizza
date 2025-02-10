import React from 'react'
import styles from './mainePage.module.scss'
import TopFilter from '@/components/filterPizza/topFilter/TopFilter'
import SidebarFilter from '@/components/filterPizza/sidebarFilter/SidebarFilter'

const MainePage = () => {
  return (
    <div>
      <TopFilter/>  
      <SidebarFilter/>
    </div>
  )
}

export default MainePage