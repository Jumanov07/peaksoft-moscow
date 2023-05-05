import { useRef } from 'react'
import { motion } from 'framer-motion'
import TitleText from '../titleText/TitleText'
import styles from './AboutLesson.module.css'
import LessonsCarousel from '../lessonsCarousel/LessonsCarousel'

function AboutLesson() {
   const animationStylesRef = useRef({
      hidden: {
         x: -100,
         opacity: 0,
         transition: { y: { stiffness: 1000 } },
      },
      visible: (custom) => ({
         x: 0,
         opacity: 1,
         transition: {
            delay: custom * 0.2,
            y: { stiffness: 1000, velocity: -100 },
         },
      }),
   })
   return (
      <div className={styles.container}>
         <motion.div
            className={styles.wrapper}
            initial="hidden"
            whileInView="visible"
            variants={animationStylesRef.current}
            viewport={{ amount: 0.4, once: true }}
         >
            <div className={styles.title}>
               <TitleText text="Как проходят наши занятия?" />
            </div>
            <div className={styles.slider}>
               <LessonsCarousel />
            </div>
         </motion.div>
      </div>
   )
}

export default AboutLesson
