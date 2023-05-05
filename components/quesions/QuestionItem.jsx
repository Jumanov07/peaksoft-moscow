import React, { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import plusIcon from '../../public/Vector.svg'
import closeIcon from '../../public/Vector2.svg'
import styles from './QuestionsItem.module.css'

export default function QuestionItem({ answer, onToggle, isActive, index }) {
   const componentAnimationRef = useRef({
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
      <motion.div
         viewport={{ once: true }}
         variants={componentAnimationRef.current}
         custom={index}
         key={answer.id}
         className={isActive ? styles.activeAccardeonBox : styles.accardeonBox}
         onClick={() => onToggle(index)}
      >
         <div className={styles.box}>
            <div className={styles.list}>{answer.id}</div>
            <div className={styles.question}> {answer.question}</div>
            <div className={styles.icon}>
               {isActive ? (
                  <div className={styles.closeIcon}>
                     <Image src={closeIcon} loading="lazy" />
                  </div>
               ) : (
                  <Image src={plusIcon} />
               )}
            </div>
         </div>
         {isActive && <div className={styles.answer}>{answer.answer}</div>}
      </motion.div>
   )
}
