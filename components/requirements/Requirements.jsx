import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from './Requirements.module.css'
import peopleIcon from '../../public/icons/PeopleIcon.svg'
import dataTime from '../../public/icons/DateTimeIcon.svg'
import devicesIcon from '../../public/icons/DevicesIcon.svg'
import devicesIcon2 from '../../public/icons/DevicesIcon2.svg'
import bgImg from '../../public/img/bg-for-req.jpg'

function Requirements() {
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
   return (
      <div className={styles.forBg}>
         <div className={styles.bgImage}>
            <Image
               objectFit="cover"
               layout="fill"
               quality={100}
               src={bgImg}
               srcSet={bgImg}
            />
         </div>
         <motion.section
            initial="hidden"
            whileInView="visible"
            variants={textAnimationRef.current}
            viewport={{ amount: 0.25, once: true }}
            className={styles.container}
         >
            <h2>Требования к заявителям </h2>
            <motion.div
               initial="hidden"
               whileInView="visible"
               custom={1}
               viewport={{ once: true }}
               variants={textAnimationRef.current}
               className={styles.forCards}
            >
               <motion.div
                  variants={textAnimationRef.current}
                  custom={1.5}
                  className={styles.card}
               >
                  <Image src={peopleIcon} />
                  <p>
                     Набираем студентов <br /> старше 16 лет
                  </p>
               </motion.div>
               <motion.div
                  variants={textAnimationRef.current}
                  custom={2}
                  className={styles.card}
               >
                  <Image src={dataTime} />
                  <p>
                     Заявители должны уделять <br /> по 4-8 часов в день
                  </p>
               </motion.div>
               <motion.div
                  variants={textAnimationRef.current}
                  custom={3}
                  className={styles.card}
               >
                  <Image src={devicesIcon} />
                  <p>
                     Умение пользоваться, либо <br /> Базовые знания компьютера
                  </p>
               </motion.div>
               <motion.div
                  variants={textAnimationRef.current}
                  custom={4}
                  className={styles.card}
               >
                  <Image src={devicesIcon2} />
                  <p>
                     Каждый заявитель должен <br /> иметь собственный ноутбук
                  </p>
               </motion.div>
            </motion.div>
         </motion.section>
      </div>
   )
}

export default Requirements
