import { useRef } from 'react'
import { motion } from 'framer-motion'
import Footer from '../footer/Footer'
import styles from './Employment.module.css'
import EmploymentSecondCard from './employmentSecondCard/EmploymentSecondCard'
import EmploymentCard from './employmentCard/EmploymentCard'
import BreadCrumbs from '../UI/breadcrumbs/Breadcrumbs'
import iconOne from '../../public/img/iconOne.svg'
import iconTwo from '../../public/img/iconTwo.svg'
import iconThree from '../../public/img/iconThree.svg'
import jobCardPhoto1 from '../../public/icons/images/11.png'
import jobCardPhoto2 from '../../public/icons/images/12.png'
import jobCardPhoto3 from '../../public/icons/images/13.png'
import clockIcon from '../../public/img/clockIcon.svg'
import monitorIcon from '../../public/img/monitorIcon.svg'
import compIcon from '../../public/img/compIcon.svg'
import hatIcon from '../../public/img/hatIcon.svg'

const employmentCardData = [
   {
      id: 1,
      title: 'Ментордук программа',
      description:
         'Эң алдыңкы студенттерди биз өзүбүздүн ментордук программага алып калабыз. Ментор - бул студенттерге өзү окуп үйрөнгөн билими менен болушуп, окууда студенттерге жардам берет жана Peaksoft тогу ар түрдүү проекттерде разработчик болуп иштейт.',
      stage: iconOne,
      photo: jobCardPhoto1,
   },
   {
      id: 2,
      title: 'Компанияларга сунуштоо',
      description:
         'Администрация жумушчу сураган IT компанияларга/ организацияларга мыкты студенттердин резюмелерин сунуштайбыз.',
      stage: iconTwo,
      photo: jobCardPhoto2,
   },
   {
      id: 3,
      title: 'Интервьюга даярдоо',
      description:
         'Резюме түзүүгө жардам берип, жумушка кирүү интервьюсуна дайындайбыз, кандай жактан жана кайсы жактан жумуш табуу керек экендиги тууралуу айтып, ресурстарды көрсөтүп беребиз.',
      stage: iconThree,
      photo: jobCardPhoto3,
   },
]

const empSecondCardData = [
   {
      id: 1,
      icon: clockIcon,
      title: 'Окуу жана үй тапшырмасы үчүн бош убакыт',
      description:
         'Эгерде сиз жаңы кесипти аркалап жатсаңыз, күнүнө 4-8 саатыңызды окууга жана үй тапшырмасына бөлүшүңүз керек болот.Болбосо, адистикти керектүү деңгээлде тез өздөштүрүп кете албайсыз.',
   },
   {
      id: 2,
      icon: monitorIcon,
      title: 'Өз алдынча окуу',
      description:
         'Курста окуу менен катар, өз адистигиңиз боюнча макалаларды окуңуз, видеолорду көрүңүз, подкасттарды угуңуз. Өз алдынча окуу жана практика окуу процессин жеңилдетет жана тездетет.',
   },
   {
      id: 3,
      icon: compIcon,
      title: 'IT чөйрөдөгү кесиптештер менен баарлашуу',
      description:
         'Сиздин тармакта иштегендер менен баарлашуу көптөгөн жаңы жана кызыктуу нерселерди үйрөнүү үчүн идеалдуу мүмкүнчүлүк. Эгерде сизде бул мүмкүнчүлүк болсо, сөзсүз колдонуңуз.',
   },
   {
      id: 4,
      icon: hatIcon,
      title: 'Сабакка үзгүлтүксүз катышуу',
      description:
         'Сабактарды калтырбаганга аракет кылыңыз. Айына 1-3 сабак өткөрүп жиберүү норма болуп саналат. Эгер сиз көбүрөөк сабактарды өткөрүп жиберсеңиз, проекттердин үстүнөн иштөө жана үй тапшырмаңызды аткаруу сизге кыйыныраак болот.',
   },
]

const breadCrumbs = [
   {
      pathName: 'Башкы бет',
      path: '/',
      isActive: false,
      id: 'f1',
   },
   {
      pathName: ' / Жумушка орноштуруу',
      path: '/job',
      isActive: false,
      id: 'f2',
   },
]

function Employment() {
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
            viewport={{ once: true }}
            custom={1.5}
            className={styles.wrapper}
         >
            <div className={styles.breadCrumbs}>
               <BreadCrumbs breadCrumbs={breadCrumbs} />
            </div>
            <div className={styles.text}>
               <div className={styles.title}>
                  Сизди жумушка орноштуруу үчүн биз кандай иш аракет жазайбыз
               </div>
               <div className={styles.description}>
                  Жумушка орношууга биз жардам көрсөтөбүз! Бирок сиз мыкты
                  студенттин талаптарына дал келсеңиз гана. Жумушка орношууга
                  жардам берүүнүн 3 жолу бар.
               </div>
            </div>
            {employmentCardData.map((el, index) => (
               <EmploymentCard counter={index} data={el} key={el.id} />
            ))}
            <div className={styles.line} />
            <div className={styles.text}>
               <div className={styles.title2}>
                  Сиздин жыйынтыңызга таасир көрсөткөн факторлор
               </div>
            </div>
            <div className={styles.secondCardBox}>
               {empSecondCardData.map((el, index) => (
                  <EmploymentSecondCard counter={index} data={el} key={el.id} />
               ))}
            </div>
         </motion.div>
         <Footer />
      </div>
   )
}

export default Employment
