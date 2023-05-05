import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import React, { useRef } from 'react'
import Image from 'next/image'
import styles from './GridItem.module.css'

export default function GridItem({ url, speed }) {
   const { ref, inView } = useInView()
   const animationRef = useRef({
      hidden: {
         y: 150,
         opacity: 0,
      },
      visible: (custom) => ({
         y: 0,
         opacity: 1,
         transition: {
            delay: custom * 0.1,
            bounce: 0.3,
            duration: 0.5,
            type: 'spring',
         },
      }),
   })

   return (
      <motion.div
         initial="hidden"
         whileInView="visible"
         variants={animationRef.current}
         viewport={{ once: false }}
         custom={speed}
         className={styles.gridItem}
      >
         <motion.span
            variants={
               inView
                  ? animationRef.current.visible
                  : animationRef.current.hidden
            }
            custom={speed + 2}
            ref={ref}
            className={styles.img}
         >
            <Image src={url} alt="images" />
         </motion.span>
      </motion.div>
   )
}
