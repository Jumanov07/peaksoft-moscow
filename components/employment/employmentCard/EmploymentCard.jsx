import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from './EmploymentCard.module.css'

function EmploymentCard({ data, counter }) {
   const animationRef = useRef({
      hidden: {
         opacity: 0,
      },
      visible: (custom) => ({
         opacity: 1,
         transition: {
            delay: custom * 0.3,
            bounce: 0.3,
            duration: 0.5,
         },
      }),
   })
   return (
      <div className={styles.container}>
         <div className={styles.line} />
         <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationRef.current}
            className={styles.wrapper}
         >
            <motion.div
               variants={animationRef.current}
               custom={counter + 2}
               className={styles.box}
            >
               <div className={styles.stageIcon}>
                  <Image src={data.stage} />
               </div>
               <div className={styles.photo}>
                  <Image src={data.photo} />
               </div>
               <div>
                  <div className={styles.title}>{data.title}</div>
                  <div className={styles.description}>{data.description}</div>
               </div>
            </motion.div>
         </motion.div>
      </div>
   )
}

export default EmploymentCard
