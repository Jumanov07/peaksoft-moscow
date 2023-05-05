import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from './EmploymentSecondCard.module.css'

function EmploymentSecondCard({ data, counter }) {
   const animationRef = useRef({
      hidden: {
         y: 100,
         opacity: 0,
      },
      visible: (custom) => ({
         y: 0,
         opacity: 1,
         transition: {
            delay: custom * 0.3,
            bounce: 0.3,
            duration: 0.5,
         },
      }),
   })
   return (
      <motion.div
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true }}
         custom={counter}
         variants={animationRef.current}
         className={styles.container}
      >
         <div className={styles.icon}>
            <Image src={data.icon} />
         </div>
         <p className={styles.title}>{data.title}</p>
         <p className={styles.description}>{data.description}</p>
      </motion.div>
   )
}

export default EmploymentSecondCard
