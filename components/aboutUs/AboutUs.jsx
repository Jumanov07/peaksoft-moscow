import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import siliconValley from '../../public/img/squad-img.jpg'
import styles from './AboutUs.module.css'

function AboutUs() {
   const animationRef = useRef({
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
      <div className={styles.bgColor} id="about">
         <div className={styles.container}>
            <section className={styles.section}>
               <motion.div
                  className={styles.containerAboutUs}
                  initial="hidden"
                  whileInView="visible"
                  variants={animationRef.current}
                  viewport={{ once: true }}
                  custom={2}
               >
                  <h2 className={styles.aboutTitles}>О НАС</h2>
                  <motion.div
                     variants={animationRef.current}
                     custom={3}
                     viewport={{ amount: 0.2, once: true }}
                     className={styles.displaySection}
                  >
                     <div className={`${styles.scrollbarText} content`}>
                        <p className={styles.textAboutUs}>
                           <b>PeakSoft House Moscow</b> - и офлайн-курсы от
                           компании PeakSoft IT. Обучаем Back-end (Java)
                           разработке, выпускаем IT-специалистов с форматами
                           обучения как онлайн — так и офлайн. С нуля до первого
                           рабочего дня.
                        </p>
                        <p className={styles.textAboutUs}>
                           Peaksoft House Moscow всегда работает на качество, а
                           не на количество. Это связано с тем, что наша
                           программа предусматривает экзамены для студентов на
                           каждом этапе обучения для закрепления тем. Если
                           студент не освоит этап обучения, ему придется пройти
                           этот этап заново, иначе он будет отчислен.
                        </p>
                        <p className={styles.textAboutUs}>
                           Компания Peaksoft House была основана в ноябре 2020
                           года, а именно филиал в г. Москва открылась в октябре
                           2021 года. Сначала обучение проводилось только в
                           онлайн-формате. В июне 2021 года в Бишкеке был открыт
                           кампус, а также внедрен офлайн-формат обучения. В
                           настоящее время мы являемся филиалом в Москве, также
                           есть наш главный штаб в Кыргызстане г. Бишкек.
                        </p>
                        <p className={styles.textAboutUs}>
                           На сегодняшний день студенты языков Java от Peaksoft
                           House Moscow успешно закончили обучение, и 70%
                           выпускников работают IT-специалистами.
                        </p>
                        <p className={styles.textAboutUs}>
                           Идеология Peaksoft House Moscow — это патриотизм,
                           качественное образование и доступные каждому
                           возможности в Информационной технологии. Будет фото
                           команды рядом позже отправлю.
                        </p>
                     </div>
                     <div className={styles.img}>
                        <Image
                           objectFit="contain"
                           layout="fill"
                           src={siliconValley}
                           srcSet={siliconValley}
                           quality={100}
                           loading="lazy"
                        />
                     </div>
                  </motion.div>
               </motion.div>
            </section>
         </div>
      </div>
   )
}

export default AboutUs
