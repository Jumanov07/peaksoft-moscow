import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './Questions.module.css'
import TitleText from '../titleText/TitleText'
import QuestionItem from './QuestionItem'

const questionsData = [
   {
      id: 1,
      question: 'Где находится кампус?',
      answer:
         ' г. Москва метро Римская, ул Шоссе Энтузиастов д7, 3 подъезд, 4 этаж',
   },
   {
      id: 2,
      question:
         'У нас должен быть свой компьютер/ноутбук или вы его предоставляете?',
      answer:
         ' Ноутбук - один из самых необходимых инструментов для программирования, каждому студенту нужен личный ноутбук',
   },
   {
      id: 3,
      question: 'Какой ноутбук нужен для программирования?',
      answer:
         ' Бренд, база и новизна ноутбука не имеют значения. Главное минимальные параметры ноутбука для программирования: процессор Core i5 или выше, SSD на 256 ГБ и ОЗУ 8 ГБ или больше.',
   },
   {
      id: 4,
      question: 'После окончания курса мы сможем получить работу за границей?',
      answer:
         ' Мы полностью обучаем программированию, проводим подготовительные работы перед работой. Вы можете получить опыт в Кыргызстане, а потом есть большая возможность  устроиться на работу  в другую страну.',
   },
   {
      id: 5,
      question: 'Можно ли научиться ИТ после 30 лет?',
      answer:
         ' Конечно! Учиться не когда не поздно.В настоящее время женщины и мужчины в возрасте 40-50 лет, имеющие 3 диплома и 2-3 детей, обучаются в IT и достигают больших успехов.',
   },
   {
      id: 6,
      question: 'Возможно ли участие в одном занятии (пробное занятие)?',
      answer:
         ' Нет пробного урока, есть начальная 1 неделя для проверки себя. Этот неделя начинается как обычное обучения. Если вы измените свое решение в эту неделю и решите не продолжать обучение, мы вернем вам деньги.',
   },

   {
      id: 7,
      question: 'Есть ли скидка на курс?',
      answer:
         ' На нашем курсе студенты, которые показывают лучшие результаты в учебе и поведении, получают скидки. Кроме того, если два человека из одного дома или общежития зарегистрируются на курс, они также могут получить скидки в соответствии с условиями проживания и учебы',
   },
   {
      id: 8,
      question: 'Можно ли изучать программирование, не зная английского?',
      answer: ' Да, мы учим английский язык.',
   },
   {
      id: 9,
      question:
         'Какая средняя зарплата программистов в Кыргызстане и в Москве?',
      answer: ' Средняя зарплата от 500 до 2500 долларов в месяц',
   },
   {
      id: 10,
      question:
         'Можно ли учиться после 9 класса, какие предметы нужно хорошо знать?',
      answer:
         ' После окончания 9 класса можно учиться, и после 16 лет мы принимаем.',
   },
   {
      id: 11,
      question:
         'Чтобы быть успешным программистом, по каким предметам он должен хорошо разбираться и обязательно ли хорошо разбираться в математике?',
      answer:
         ' Чтобы стать хорошим программистом, необязательно быть математиком или физиком. Главное - это иметь сильную логику и хорошее понимание использования компьютера.',
   },
]

function Questions() {
   const [isAtcive, setIsActive] = useState([])
   function toggleHandle(index) {
      if (!isAtcive.includes(index)) {
         setIsActive([index])
         return
      }
      setIsActive([])
   }

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
            viewport={{ once: true, amount: 0.1 }}
            className={styles.wrapper}
            custom={1.5}
         >
            <div className={styles.title}>
               <TitleText text="ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ" />
            </div>
            <div className={styles.line} />

            {questionsData.map((el, index) => {
               const isAciveInformation = index === isAtcive[0]
               return (
                  <QuestionItem
                     onToggle={toggleHandle}
                     answer={el}
                     key={el.id}
                     isActive={isAciveInformation}
                     index={index}
                  />
               )
            })}
         </motion.div>
      </div>
   )
}

export default Questions
