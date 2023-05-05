import { useRef } from 'react'
import { motion } from 'framer-motion'
import Footer from '../footer/Footer'
import ProjectsCards from './projectsCards/ProjectsCards'
import styles from './StudentsProjects.module.css'
import peakSoftLms from '../../public/img/peakSoftProject.png'
import airbnb from '../../public/img/AirBNBproject.png'
import biligual from '../../public/img/Biligual.png'
import eBook from '../../public/img/E-Book.png'
import asiaPlus from '../../public/img/ASIA PLUS.png'
import {
   container,
   container1,
   container2,
   container3,
   container4,
} from './projectsCards/ProjectsCards.module.css'
import BreadCrumbs from '../UI/breadcrumbs/Breadcrumbs'

const breadCrumbs = [
   {
      pathName: 'Башкы бет',
      path: '/',
      isActive: false,
      id: 'f1',
   },
   {
      pathName: ' / Студенттердин проекттери',
      path: '/projects',
      isActive: false,
      id: 'f2',
   },
]
const projectsCardsData = [
   {
      id: 1,
      color: container,
      photo: peakSoftLms,
      title: 'PEAKSOFT LMS',
      description:
         'LMS - бул окуу процессин башкаруу системасы болуп саналат. Бул онлайн жана офлайн режиминде окутуу курстарын башкаруу үчүн платформа. ',
      frontDev: [
         { id: 1, name: 'Бактыяр кызы Мавлюда' },
         { id: 2, name: 'Абасканов Байаалы' },
         { id: 3, name: 'Бекембаева Айгерим' },
         { id: 4, name: 'Асанова Байырта' },
      ],
      BackDev: [
         { id: 5, name: 'Асангазиева Айжамал' },
         { id: 6, name: 'Шаботоев Кайратбек' },
         { id: 7, name: 'Ырыскул уулу Талгарбек' },
         { id: 8, name: 'Баатырова Айсулуу' },
      ],
   },
   {
      id: 2,
      color: container1,
      photo: airbnb,
      title: 'AirBnb',
      description:
         'Airbnb  - дүйнө жүзү боюнча жеке турак жайларды кыска мөөнөткө ижарага берүү жана издөө үчүн онлайн платформа.',
      frontDev: [
         { id: 9, name: 'Жаныбеков Улукмырза' },
         { id: 10, name: 'Алмазбеков Данияр' },
         { id: 11, name: 'Термечикова Бурул' },
         { id: 12, name: 'Калилова Аида' },
      ],
      BackDev: [
         { id: 13, name: 'Абдурасулов Жанарбек' },
         { id: 14, name: 'Замир кызы Хадича' },
         { id: 15, name: 'Тынычбеков Медер' },
      ],
   },
   {
      id: 3,
      color: container2,
      photo: biligual,
      title: 'Bilingual',
      description:
         'Bilingual - бул тилди билүү деңгээлин онлайн тестирлөө аркылуу текшерүү үчүн онлайн платформа.',
      frontDev: [
         { id: 16, name: 'Бокомбаев Ырыскелди' },
         { id: 17, name: 'Жетибаев Сыймык' },
         { id: 18, name: 'Абдиллаев Жетиген' },
         { id: 19, name: 'Эркулов Бейбарс' },
      ],
      BackDev: [
         { id: 20, name: 'Нурбеков Акылбек' },
         { id: 21, name: 'Курманбекова Жаңыл' },
         { id: 22, name: 'Баатыров Мухаммед' },
      ],
   },
   {
      id: 4,
      color: container3,
      photo: eBook,
      title: 'E-Book',
      description: 'Китептерди сатып алуу жана сатуу платформасы',
      frontDev: [
         { id: 23, name: 'Бекболсун Азаматов' },
         { id: 24, name: 'Жанбосунова Гулназ' },
         { id: 25, name: 'Жанышова Гулниза' },
         { id: 26, name: 'Ниязбекова Адинай' },
      ],
      BackDev: [
         { id: 27, name: 'Гапаров Куттубек' },
         { id: 28, name: 'Абдирасулов Нурбек' },
         { id: 329, name: 'Мамирайим кызы Нуриса' },
         { id: 31, name: ' Курбанов Рахим' },
      ],
   },
   {
      id: 5,
      color: container4,
      photo: asiaPlus,
      title: 'ASIA PLUS',
      description:
         'Азия Плюс - кадрларды табуу жана ишке орноштуруу боюнча кызмат көрсөтүүчү веб-сайт. Чет өлкөдөгү жана КМШда иштеп жаткан ишканалар үчүн ыйгайлаштырылып жасалып чыккан.',
      frontDev: [
         { id: 41, name: 'Сманова Айдана' },
         { id: 42, name: 'Абдигапыр уулу Азамат' },
         { id: 43, name: 'Бекмуратов Арзыбек' },
      ],
      BackDev: [
         { id: 44, name: 'Сманова Айдана' },
         { id: 45, name: 'Абдигапыр уулу Азамат' },
         { id: 46, name: 'Бекмуратов Арзыбек' },
      ],
   },
]

function StudentsProjects() {
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
         viewport={{ once: true }}
         className={`${styles.container}`}
      >
         <div className={styles.breadCrumbs}>
            <BreadCrumbs breadCrumbs={breadCrumbs} />
         </div>
         <div className={styles.wrapper}>
            {projectsCardsData.map((el) => (
               <ProjectsCards key={el.id} data={el} />
            ))}
         </div>
         <Footer />
      </motion.div>
   )
}

export default StudentsProjects
