import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from './WhatWillLearn.module.css'
import iconFront1 from '../../public/img/learnIconFront1.svg'
import iconFront2 from '../../public/img/learnIconFront2.svg'
import iconFront3 from '../../public/img/learnIconFront3.svg'
import iconFront4 from '../../public/img/learnIconFront4.svg'
import iconFront5 from '../../public/img/learnIconFront5.svg'
import iconFront6 from '../../public/img/learnIconFront6.svg'
import iconBack1 from '../../public/img/learnIconBack1.svg'
import iconBack2 from '../../public/img/learnIconBack2.svg'
import iconBack3 from '../../public/img/learnIconBack3.svg'
import iconBack4 from '../../public/img/learnIconBack4.svg'
import iconBack5 from '../../public/img/learnIconBack5.svg'
import iconBack6 from '../../public/img/learnIconBack6.svg'

const frontData = [
   {
      id: 1,
      icon: iconFront1,
      description: 'JavaScript тилинде программалоону',
   },
   {
      id: 2,
      icon: iconFront2,
      description: 'Интерактивдүү веб-сайттардын интерфейсин түзүүнү',
   },
   {
      id: 3,
      icon: iconFront3,
      description: 'Вебсайттарды түзүүнү (HTML&CSS)',
   },
   {
      id: 4,
      icon: iconFront4,
      description:
         'React библиотекасынын жардамы менен заманбап интерфейстерди түзүүнү ',
   },
   {
      id: 5,
      icon: iconFront5,
      description:
         'Redux библиотекасын колдонуп чоң маалымат агымдарын башкарууну',
   },
   { id: 6, icon: iconFront6, description: 'Хостингге сайтты жуктөөнү' },
]

const backData = [
   {
      id: 1,
      icon: iconBack1,
      description: 'Программировать на языке Java',
   },
   {
      id: 2,
      icon: iconBack2,
      description: 'Создание интерактивных интерфейсов веб-сайта',
   },
   {
      id: 3,
      icon: iconBack3,
      description: 'Создавать веб-приложения',
   },
   {
      id: 4,
      icon: iconBack4,
      description: 'Создание приложений с использованием фреймворка Spring. ',
   },
   {
      id: 5,
      icon: iconBack5,
      description: 'Использование в разработке библиотеку Hibernate',
   },
   {
      id: 6,
      icon: iconBack6,
      description: 'Создавать и подключать базы данных',
   },
]

function WhatWillLearn({ course }) {
   const animationRef = useRef({
      hidden: {
         x: -100,
         opacity: 0,
      },
      visible: (custom) => ({
         x: 0,
         opacity: 1,
         transition: {
            delay: custom * 0.3,
            bounce: 0.3,
            duration: 0.5,
         },
      }),
   })
   const textAnimationRef = useRef({
      hidden: {
         x: -100,
         opacity: 0,
      },
      visible: (custom) => ({
         x: 0,
         opacity: 1,
         transition: { delay: custom * 0.2 },
      }),
   })

   const dataBase = course === 'frontend' ? frontData : backData
   return (
      <motion.div
         initial="hidden"
         whileInView="visible"
         variants={textAnimationRef.current}
         viewport={{ once: true }}
         className={styles.container}
      >
         <div className={styles.title}> Чему вы научитесь?</div>
         <div className={styles.description}>
            После окончания курсов вы можете стать Java-разработчиком со знанием
            последующих Stack технологий:
         </div>
         <motion.div
            initial="hidden"
            whileInView="visible"
            variants={animationRef.current}
            viewport={{ once: true }}
            className={styles.secondBlock}
         >
            {dataBase.map((el, index) => (
               <motion.div
                  variants={animationRef.current}
                  custom={index}
                  key={el.id}
                  className={styles.box}
               >
                  <div className={styles.icon}>
                     <Image loading="lazy" src={el.icon} />
                  </div>
                  <div className={styles.descriptionBox}>{el.description}</div>
               </motion.div>
            ))}
         </motion.div>
      </motion.div>
   )
}

export default WhatWillLearn
