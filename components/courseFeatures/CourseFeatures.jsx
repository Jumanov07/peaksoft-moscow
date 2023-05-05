import Image from 'next/image'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './CourseFeatures.module.css'
import TitleText from '../titleText/TitleText'
import cardIcon1 from '../../public/img/featuresIcon1.svg'
import cardIcon2 from '../../public/img/featuresIcon2.svg'
import cardIcon3 from '../../public/img/featuresIcon3.svg'
import cardIcon4 from '../../public/img/featuresIcon4.svg'
import cardIcon5 from '../../public/img/featuresIcon5.svg'
import cardIcon6 from '../../public/img/featuresIcon6.svg'

const cardsData = [
   {
      id: 1,
      photo: cardIcon1,
      title: 'СИСТЕМА НАСТАВНИКА',
      description:
         'Поддержка наставником. Обращение к Ментору в онлайн/оффлайн формате 6 раз в неделю.',
   },
   {
      id: 2,
      photo: cardIcon2,
      title: 'СТРОГИЙ НАДЗОР',
      description:
         'Проверка обучение на каждом этапе насколько развиваются ваши навыки. Работа над ошибками.',
   },

   {
      id: 3,
      photo: cardIcon3,
      title: 'ПРЕПОДАВАНИЕ НА КЫРГЫЗСКОМ ЯЗЫКЕ',
      description: 'Обучение программированию на кыргызском языке.',
   },
   {
      id: 4,
      photo: cardIcon4,
      title: 'Кампус',
      description:
         'Наш кампус открыт для студентов 6 дней в неделю. Предоставляются все условия для обучения на кампусе.',
   },
   {
      id: 5,
      photo: cardIcon5,
      title: 'ГЕРМЕТИЧНОЕ СОЕДИНЕНИЕ',
      description:
         'Коммуникация с Инструкторами и менторами в открытом доступе.',
   },
   {
      id: 6,
      photo: cardIcon6,
      title: 'ПОДДЕРЖКА',
      description:
         'Мы всегда поддерживаем наших студентов до первого рабочего дня.',
   },
]

function CourseFeatures() {
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
      <div className={styles.container}>
         <motion.div
            initial="hidden"
            whileInView="visible"
            variants={componentAnimationRef.current}
            viewport={{ amount: 0.1, once: false }}
            className={styles.wrapper}
         >
            <div className={styles.title}>
               <TitleText text="ОСОБЫЕ ВОЗМОЖНОСТИ" />
            </div>
            <p className={styles.description}>
               Первая неделя — это время самоанализа. Если вы не сможете
               продолжить обучение в течение 1 недели, 100% оплаты будет
               возвращено.
               <br />
               Выплаты производятся ежемесячно.
            </p>
            <motion.div
               variants={componentAnimationRef.current}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className={styles.cards}
               custom={4}
            >
               {cardsData.map((el) => (
                  <div key={el.id} className={styles.card}>
                     <div className={styles.icon}>
                        <Image loading="lazy" src={el.photo} />
                     </div>
                     <p className={styles.cardTitle}>{el.title}</p>
                     <p className={styles.cardDescription}>{el.description}</p>
                  </div>
               ))}
            </motion.div>
         </motion.div>
      </div>
   )
}

export default CourseFeatures
