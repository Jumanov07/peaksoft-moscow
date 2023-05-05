import { useRef } from 'react'
import { motion } from 'framer-motion'
import TitleText from '../titleText/TitleText'
import styles from './StagesLearning.module.css'

const backEndData = {
   id: 1,
   title: 'Back-end',
   firstDescription:
      'Backend — это одно из направлений в программировании, в котором программист находится на стороне сайта, невидимой для пользователя. Он отвечает за обработку пользовательского ввода, хранение и передачу данных.',
   secondDescription:
      'Язык программирования Java уже много лет является одним из популярных языков программирования. С его помощью создаются различные программные решения: от компьютерных игр до мобильных приложений для Android, банковских систем и Программного Обеспечения для хранения данных.',
   yourLearnPath: {
      title: 'Ваш путь состоит из 3 шагов',
      description:
         'Программа обучения составляет 9 месяцев. 9 месяцев - разделены на 3 этапа. Каждый этап длится 3 месяца.',
      aboutDesc: [
         {
            id: 1,
            title: 'I этап',
            desc: 'Глубокое обучение с базой программирования и знакомство миром Информационных Технологий.',
         },
         {
            id: 2,
            title: 'II этап',
            desc: 'Обширное обучение программирования и дополнительные инструменты (фреймворки), необходимые для разработки.',
         },
         {
            id: 3,
            title: 'III этап',
            desc: 'Стажировка, подготовка резюме и подготовка к процессу собеседования.',
         },
      ],
   },
   firstStage: [
      { id: 1, title: '- Математические операции' },
      { id: 2, title: '- Условные операторы ' },
      { id: 3, title: '- Циклы' },
      { id: 4, title: '- Массивы' },
      { id: 5, title: '- Методы' },
      { id: 6, title: '- Git' },
      { id: 7, title: '- ООП' },
      { id: 8, title: '- Exceptions' },
      { id: 9, title: '- Работа с файлами ' },
      { id: 10, title: '- Коллекция фреймворков' },
      { id: 11, title: '- Лямбда выражения' },
      { id: 12, title: '- Stream API' },
   ],

   secondStage: [
      { id: 1, title: '- Углубленное изучение Java' },
      {
         id: 2,
         title: '- Сборка проектов с помощью Apache Maven',
      },
      { id: 3, title: '- PostgreSQL (Реляционная База данных)' },
      { id: 4, title: '- JDBC & Hibernate' },
      { id: 5, title: '- Основы Java EE      ' },
      { id: 6, title: '- Разработка веб-сервисов на платформе Java      ' },
      { id: 7, title: '- Thymeleaf' },
      { id: 8, title: '- Spring Core' },
      { id: 9, title: '- Spring MVC' },
      { id: 10, title: '- Spring Data' },
      { id: 11, title: '- Spring Security' },
      { id: 12, title: '- Spring Boot' },
      { id: 13, title: '- Использование AWS Services      ' },
   ],
   thirdStage: [
      {
         id: 1,
         title: '3 этап обучения проходит в формате стажировки. Наши студенты работают над коммерческими проектами вместе с разработчиками, дизайнерами, руководителями проектов. Кроме того, с помощью инструкторов отрабатываются два самых важных шага при устройстве на работу — это резюме и реальные собеседования. Текущие разработчики проведут мастер-классы по составлению правильного резюме, где и как искать работу, а также процессы собеседования.',
      },
   ],
}

function StagesLearning({ course }) {
   const data = course === 'backend' ? backEndData : ''

   const animationRef = useRef({
      hidden: {
         x: -100,
         opacity: 0,
      },
      visible: (custom) => ({
         x: 0,
         opacity: 1,
         transition: {
            delay: custom * 0.3,
            bounce: 0.3,
            duration: 0.5,
         },
      }),
   })
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
      <motion.div
         initial="hidden"
         whileInView="visible"
         variants={textAnimationRef.current}
         viewport={{ once: true }}
         className={
            course === 'frontend' ? styles.container : styles.containerBackend
         }
      >
         <div className={styles.title}>
            <TitleText text={data.title} />
         </div>
         <div className={styles.description}>
            <motion.p
               variants={animationRef.current}
               custom={1}
               className={styles.firstDescription}
            >
               {data.firstDescription}
            </motion.p>
            <motion.p
               variants={animationRef.current}
               custom={1.5}
               className={styles.secondDescription}
            >
               {data.secondDescription}
            </motion.p>
         </div>
         <div className={styles.pathContainer}>
            <TitleText text={data.yourLearnPath.title} />
            <p className={styles.p}>{data.yourLearnPath.description}</p>
            <div className={styles.descContainer}>
               {data.yourLearnPath.aboutDesc.map((desc) => (
                  <div className={styles.aboutDesc} key={desc.id}>
                     <span className={styles.spann}>{desc.title}</span>
                     <p>{desc.desc}</p>
                  </div>
               ))}
            </div>
         </div>
         <div className={course === 'frontend' ? styles.aboutContainer : ''}>
            <div
               className={
                  course === 'backend' ? styles.parent : styles.frontParent
               }
            >
               <div
                  className={
                     course === 'backend' ? styles.lines : styles.frontLines
                  }
               >
                  <div className={styles.circleParent}>
                     <div className={styles.circleChild} />
                  </div>
                  <div
                     className={
                        course === 'backend' ? styles.line1 : styles.frontLines1
                     }
                  />
                  <div className={styles.circleParent}>
                     <div className={styles.circleChild} />
                  </div>
                  <div
                     className={
                        course === 'backend' ? styles.line2 : styles.frontLines2
                     }
                  />
                  <div className={styles.circleParent}>
                     <div className={styles.circleChild} />
                  </div>
               </div>
               <motion.div
                  initial="hidden"
                  whileInView="visible"
                  variants={textAnimationRef.current}
                  viewport={{ once: true }}
                  className={
                     course === 'backend' ? styles.stage : styles.frontStage
                  }
               >
                  <motion.div
                     variants={animationRef.current}
                     custom={1}
                     className={
                        course === 'backend'
                           ? styles.firstStage
                           : styles.frontFirstStage
                     }
                  >
                     I Этап
                  </motion.div>
                  <motion.div
                     variants={animationRef.current}
                     custom={1.5}
                     className={
                        course === 'backend'
                           ? styles.secondStage
                           : styles.frontSecondStage
                     }
                  >
                     II Этап
                  </motion.div>
                  <motion.div
                     variants={animationRef.current}
                     custom={2}
                     className={
                        course === 'backend'
                           ? styles.thirdStage
                           : styles.frontThirdStage
                     }
                  >
                     III Этап
                  </motion.div>
               </motion.div>
            </div>
            <motion.div
               initial="hidden"
               whileInView="visible"
               variants={animationRef.current}
               viewport={{ once: true }}
               className={
                  course === 'backend' ? styles.themes : styles.frontThemes
               }
            >
               <motion.div
                  variants={animationRef.current}
                  custom={1}
                  className={
                     course === 'backend' ? styles.firstStageThemes : ''
                  }
               >
                  {data.firstStage.map((el) => (
                     <div key={el.id}>{el.title}</div>
                  ))}
               </motion.div>
               <motion.div
                  variants={animationRef.current}
                  custom={2}
                  className={
                     course === 'backend'
                        ? styles.secondStageThemes
                        : styles.frontSecondStageTheme
                  }
               >
                  {data.secondStage.map((el) => (
                     <div key={el.id}>{el.title}</div>
                  ))}
               </motion.div>
               <motion.div
                  variants={animationRef.current}
                  custom={3}
                  className={
                     course === 'backend'
                        ? styles.thirdStageThemes
                        : styles.frontThirdStageThemes
                  }
               >
                  {data.thirdStage.map((el) => (
                     <div key={el.id}>{el.title}</div>
                  ))}
               </motion.div>
            </motion.div>
         </div>
      </motion.div>
   )
}

export default StagesLearning
