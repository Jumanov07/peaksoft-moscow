import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from './ProjectsCards.module.css'

function ProjectsCards({ data }) {
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
         initial="hidden"
         whileInView="visible"
         variants={componentAnimationRef.current}
         viewport={{ amount: 0.4, once: true }}
         className={data.color}
      >
         <div className={styles.photo}>
            <Image width={486} height={300} src={data.photo} />
         </div>
         <div className={styles.textBox}>
            <motion.div
               variants={componentAnimationRef.current}
               className={styles.title}
               custom={2}
            >
               {data.title}
            </motion.div>
            <div className={styles.description}>{data.description}</div>
            <div className={styles.participants}>
               <div className={styles.frontEnd}>
                  <div className={styles.direction}>Front-end</div>
                  <motion.div
                     variants={animationRef.current}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true }}
                     className={styles.programmers}
                  >
                     {data.frontDev.map((el, index) => (
                        <motion.div
                           custom={index}
                           variants={animationRef.current}
                           key={el.id}
                           className={styles.programmer}
                        >
                           {el.name}
                        </motion.div>
                     ))}
                  </motion.div>
               </div>
               <div className={styles.backEnd}>
                  <div className={styles.direction}>Back-end</div>
                  <motion.div
                     variants={animationRef.current}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true }}
                     className={styles.programmers}
                  >
                     {data.BackDev.map((el, index) => (
                        <motion.div
                           custom={index}
                           variants={animationRef.current}
                           key={el.id}
                           className={styles.programmer}
                        >
                           {el.name}
                        </motion.div>
                     ))}
                  </motion.div>
               </div>
            </div>
         </div>
      </motion.div>
   )
}

export default ProjectsCards
