import { useRef } from 'react'
import { motion } from 'framer-motion'
import CourseCard from '../courseCard/CourseCard'
import styles from './AboutITCourses.module.css'

function AboutITCourses() {
   const componentAnimationRef = useRef({
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
      <div className={styles.container} id="itCourse">
         <motion.div
            initial="hidden"
            whileInView="visible"
            variants={componentAnimationRef.current}
            viewport={{ once: true }}
            className={styles.wrapper}
         >
            <motion.h3
               variants={componentAnimationRef.current}
               custom={3}
               className={styles.title}
            >
               IT курсЫ
            </motion.h3>

            <motion.div className={styles.cards}>
               {/* <Link href="/backend"> */}
               <motion.div variants={componentAnimationRef.current} custom={5}>
                  <CourseCard course="backend" type="Back-End" />
               </motion.div>
               {/* </Link> */}

               {/* <Link href="/compLiteracy"> */}
               {/* <motion.div variants={componentAnimationRef.current} custom={5}>
                  <CourseCard
                     course="compLiteracy"
                     type="Компьютердик сабаттуулук"
                  />
               </motion.div> */}
               {/* </Link> */}
            </motion.div>
         </motion.div>
      </div>
   )
}

export default AboutITCourses
