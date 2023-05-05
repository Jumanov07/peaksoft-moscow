import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { motion } from 'framer-motion'
import styles from './FeedBaks.module.css'
import SampleNextArrow from '../studyStatusBanner/SampleNextArrow'
import SamplePrevArrow from '../studyStatusBanner/SamplePrevArrow'
import ulukmyrza from '../../public/img/ulukmyrza.svg'
import aidar from '../../public/img/aidar.svg'
import meerim from '../../public/img/meerim.svg'

const feedBackData = [
   {
      id: 1,
      feedback:
         '«Что мне нравится в этих курсах, так это то, что уроки доступны и понятны на кыргызском языке, можно посмотреть сохраненные видео уроков, помощь наставников и хорошие отношения.»',
      photo: ulukmyrza,
      name: 'Улукмырза Талипов .',
      profession: 'Java Backend . PayDala. ',
      city: 'Казахстан.',
   },
   {
      id: 2,
      feedback:
         '«Преимущество курса в том, что он доступен на кыргызском языке, и мне нравится, что занятия 5 дней в неделю.»',
      photo: aidar,
      name: 'Айдар Алмазбеков ',
      profession: 'Java Backend . Прайм',
      city: ' Москва.',
   },
   {
      id: 3,
      feedback:
         '«По моему мнению Peaksoft дает Качественное образование, уроки английского языка и SoftSkills тоже очень полезны, тесное общение менторов и учеников также неотъемлемая часть.»',
      photo: meerim,
      name: 'Мээрим Балтабаева ',
      profession: 'Java Backend, МГУ',
      city: 'Москва.',
   },
]

function FeedBaks() {
   const sliderRef = useRef(null)
   const [isSSR, setIsSSR] = useState(true)

   useEffect(() => {
      setIsSSR(false)
   }, [])
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

   const handlePrev = useCallback(() => {
      if (!sliderRef.current) return
      sliderRef.current.swiper.slidePrev()
   }, [])

   const handleNext = useCallback(() => {
      if (!sliderRef.current) return
      sliderRef.current.swiper.slideNext()
   }, [])

   const render = feedBackData.map((item) => {
      return (
         <SwiperSlide key={item.name}>
            <div className={styles.sliderBoxContainer} id="graduates">
               <div className={styles.sliderBoxFeedBack}>
                  {item.feedback}
                  <span className={styles.arrow} />
               </div>
               <div key={item.id} className={styles.sliderBoxFeedBackStudents}>
                  <Image
                     objectFit="cover"
                     srcSet={item.photo}
                     quality={100}
                     src={item.photo}
                     loading="lazy"
                     style={{ borderRadius: '50%' }}
                  />
                  <div className={styles.sliderBoxStudentsContiner}>
                     <p className={styles.sliderBoxStudentsName}>{item.name}</p>
                     <p className={styles.slideBoxStudentJob}>
                        {item.profession}
                     </p>
                     <p className={styles.slideBoxStudentJob}>{item.city}</p>
                  </div>
               </div>
            </div>
         </SwiperSlide>
      )
   })

   return (
      <motion.section
         viewport={{ amount: 0.45, once: true }}
         className={styles.container}
      >
         <motion.div
            className={styles.wrapper}
            initial="hidden"
            whileInView="visible"
            variants={textAnimationRef.current}
            viewport={{ amount: 0.45, once: true }}
         >
            <h3 className={styles.title}>Наши выпускники</h3>
            <p className={styles.description}>
               Мнения наших студентов o курсе:
            </p>
         </motion.div>
         <div className={styles.cont}>
            <div className={styles.prevArrow}>
               <SamplePrevArrow onClick={handlePrev} />
            </div>
            <div className={styles.nextArrow}>
               <SampleNextArrow onClick={handleNext} />
            </div>
            <Swiper
               ref={sliderRef}
               loop
               slidesPerView={1.3}
               spaceBetween={50}
               grabCursor
               centeredSlides={false}
               breakpoints={{
                  500: {
                     slidesPerView: 3.4,
                     spaceBetween: 20,
                     grabCursor: true,
                     centeredSlides: false,
                  },
                  991: {
                     slidesPerView: 3,
                     spaceBetween: 20,
                     grabCursor: true,
                     centeredSlides: false,
                  },
               }}
               slideToClickedSlide
               keyboard={{
                  enabled: true,
                  onlyInViewport: true,
               }}
               pagination={{
                  clickable: true,
               }}
               speed={1000}
               modules={[Navigation, Pagination]}
            >
               {isSSR || render}
            </Swiper>
         </div>
      </motion.section>
   )
}
export default FeedBaks
