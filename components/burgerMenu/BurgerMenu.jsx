import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Link as ScrollLink } from 'react-scroll'
import { motion } from 'framer-motion'
import styles from './BurgerMenu.module.css'
import burgerIcon from '../../public/img/BurgerMenuIcon.svg'
import closeIcon from '../../public/img/closeIcon.svg'
import { Backdrop } from '../UI/modal/backdrop/Backdrop'

function BurgerMenu({ handleBurgerMenu }) {
   const [isOpenDropDown, setIsOpenDropDown] = useState(false)

   const openDropDown = () => {
      setIsOpenDropDown((prev) => !prev)
   }

   return (
      <>
         <Backdrop onClose={handleBurgerMenu} />
         <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className={styles.container}
         >
            <div onClick={handleBurgerMenu} className={styles.closeIcon}>
               <Image src={closeIcon} />
            </div>
            <Link href="/">
               <div className={styles.icon}>
                  <Image src={burgerIcon} />
               </div>
            </Link>
            <div className={styles.menus}>
               <div className={styles.menu}>
                  <div className={styles.navMenu}>
                     <button className={styles.btn} onClick={openDropDown}>
                        IT курсы
                     </button>
                     {isOpenDropDown && (
                        <ul className={styles.dropdownMenu}>
                           <li className={styles.submenu}>
                              <Link className={styles.a} href="/backend">
                                 Back-end
                              </Link>
                           </li>
                           <li className={styles.submenu}>
                              <Link className={styles.a} href="/compLiteracy">
                                 Компьютерная грамотность
                              </Link>
                           </li>
                        </ul>
                     )}
                  </div>
               </div>
               <div className={styles.menu}>
                  <ScrollLink to="about" spy smooth offset={0} duration={2000}>
                     O нас
                  </ScrollLink>
               </div>
               <div className={styles.menu}>
                  <ScrollLink
                     to="graduates"
                     spy
                     smooth
                     offset={-250}
                     duration={1500}
                  >
                     наши выпускники
                  </ScrollLink>
               </div>
               <div className={styles.menu}>
                  <ScrollLink
                     to="contacts"
                     spy
                     smooth
                     offset={-100}
                     duration={1500}
                  >
                     контакты
                  </ScrollLink>
               </div>
            </div>
            <div className={styles.workingTime}>
               <div className={styles.day}>ПН - СБ </div>
               <div className={styles.hour}>11:00 - 22:00</div>
            </div>
         </motion.div>
      </>
   )
}

export default BurgerMenu
