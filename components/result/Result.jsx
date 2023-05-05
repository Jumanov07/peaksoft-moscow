/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from './Result.module.css'
import certificatePhoto from '../../public/img/certificatePhoto.png'
import resumePhotoBack from '../../public/img/resumePhotoBack.svg'
import resumePhotoFront from '../../public/img/resumePhotoFront.svg'
import projectPhoto from '../../public/img/projectPhoto.png'

function Result({ course }) {
   const [chooser, setChooser] = useState('certificate')

   function resultShowChangher(name) {
      setChooser(name)
   }
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
      <div className={styles.container}>
         <div className={styles.title}>Результаты</div>
         <motion.div
            initial="hidden"
            whileInView="visible"
            variants={textAnimationRef.current}
            viewport={{ once: true }}
            className={styles.wrapper}
         >
            <div className={styles.box}>
               <div className={styles.chooser}>
                  <div
                     onClick={() => {
                        resultShowChangher('certificate')
                     }}
                     className={
                        chooser === 'certificate'
                           ? styles.active
                           : styles.notactive
                     }
                  >
                     <p className={styles.tabText}>Сертификат</p>
                  </div>
                  <div
                     onClick={() => {
                        resultShowChangher('resume')
                     }}
                     className={
                        chooser === 'resume' ? styles.active : styles.notactive
                     }
                  >
                     <p className={styles.tabText}>Резюме</p>
                  </div>
                  <div
                     onClick={() => {
                        resultShowChangher('project')
                     }}
                     className={
                        chooser === 'project' ? styles.active : styles.notactive
                     }
                  >
                     <p className={styles.tabText}>Проекттер</p>
                  </div>
               </div>
               <div className={styles.content}>
                  {chooser === 'certificate' ? (
                     <div className={styles.certificateContent}>
                        <Image src={certificatePhoto} />
                     </div>
                  ) : chooser === 'resume' ? (
                     <div className={styles.resumeContent}>
                        <Image
                           src={
                              course === 'frontend'
                                 ? resumePhotoFront
                                 : resumePhotoBack
                           }
                        />
                     </div>
                  ) : (
                     <div className={styles.projectContent}>
                        <Image src={projectPhoto} />
                     </div>
                  )}
               </div>
            </div>
         </motion.div>
      </div>
   )
}
export default Result
