import { useState, useRef, useCallback } from 'react'
import { Navigation, Pagination, FreeMode, EffectCoverflow } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import styles from './Carousel.module.css'
import slide1 from '../../public/teamPhoto/TeamPhoto1.jpg'
import slide2 from '../../public/teamPhoto/TeamPhoto2.jpg'
import slide3 from '../../public/teamPhoto/TeamPhoto3.jpg'
import slide4 from '../../public/teamPhoto/TeamPhoto4.jpg'
import slide5 from '../../public/teamPhoto/TeamPhoto5.jpg'
import slide6 from '../../public/teamPhoto/TeamPhoto6.jpg'
import slide7 from '../../public/teamPhoto/TeamPhoto7.jpg'
import slide11 from '../../public/teamPhoto/TeamPhoto11.png'
import SampleNextArrow from '../studyStatusBanner/SampleNextArrow'
import SamplePrevArrow from '../studyStatusBanner/SamplePrevArrow'

const peaksoftTeamInformation = [
   {
      id: 1,
      photo: slide11,
      employeeName: 'Эсен Ниязов',
      jobTitle: 'Основатель Курса',
   },
   {
      id: 8,
      photo: slide1,
      employeeName: 'Таджибаева Элнура ',
      jobTitle: 'Руководитель курса и  Java Инструктор',
   },
   {
      id: 3,
      photo: slide2,
      employeeName: 'Кубанов Муктар ',
      jobTitle: 'Java Инструктор',
   },
   {
      id: 11,
      photo: slide3,
      employeeName: 'Арзыматова Нурпери ',
      jobTitle: 'Java Инструктор',
   },
   {
      id: 5,
      photo: slide6,
      employeeName: 'Касымбаев Тимурлан ',
      jobTitle: 'Java ментор',
   },
   {
      id: 4,
      photo: slide5,
      employeeName: 'Камчыбек кызы Айдана ',
      jobTitle: 'Преподаватель Английского языка',
   },
   {
      id: 6,
      photo: slide7,
      employeeName: 'Алмазбеков Мухаммед ',
      jobTitle: 'Java ментор',
   },
   {
      id: 9,
      photo: slide4,
      employeeName: 'Тынычбеков Медер ',
      jobTitle: 'Java ментор',
   },
]
export default function Carousel() {
   const [activeIndex, setActiveIndex] = useState()
   const sliderRef = useRef(null)

   const handlePrev = useCallback(() => {
      if (!sliderRef.current) return
      sliderRef.current.swiper.slidePrev()
   }, [])

   const handleNext = useCallback(() => {
      if (!sliderRef.current) return
      sliderRef.current.swiper.slideNext()
   }, [])

   return (
      <div className={styles.cont}>
         <h1 className={styles.title}>Наша команда</h1>
         <div className={styles.prevArrow}>
            <SamplePrevArrow onClick={handlePrev} />
         </div>
         <div className={styles.nextArrow}>
            <SampleNextArrow onClick={handleNext} />
         </div>
         <Swiper
            ref={sliderRef}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            modules={[Navigation, EffectCoverflow, Pagination, FreeMode]}
            loop
            spaceBetween={20}
            zoom
            slidesPerView="auto"
            effect="coverflow"
            simulateTouch
            touchRatio={1}
            grabCursor
            centeredSlides
            className={styles.swiper}
            keyboard={{
               enabled: true,
               onlyInViewport: true,
            }}
            mousewheel={{
               sensitivity: 1,
            }}
            pagination={{
               clickable: true,
            }}
            slideToClickedSlide
            speed={1000}
            autoplay={{ delay: 500 }}
            coverflowEffect={{
               rotate: 45,
               stretch: 0,
               depth: 100,
               modifier: 0.6,
               slideShadows: false,
            }}
         >
            {peaksoftTeamInformation.map((item, index) => (
               <SwiperSlide key={item.id} className={styles.swiperSlide}>
                  <div
                     key={item.id}
                     className={`${styles.myDiv} ${
                        index === activeIndex && styles.zoom
                     }`}
                  >
                     <Image
                        src={item.photo}
                        style={{
                           borderRadius: '5px',
                        }}
                        loading="eager"
                        objectFit="contain"
                     />
                     <p className={styles.employeName}>{item.employeeName}</p>
                     <p className={styles.jobTitleStyles}>{item.jobTitle}</p>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   )
}
