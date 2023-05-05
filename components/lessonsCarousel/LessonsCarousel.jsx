import { useState, useRef, useCallback } from 'react'
import { FreeMode, Thumbs, Controller } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import styles from './LessonsCarousel.module.css'
import image1 from '../../public/icons/images/1.png'
import image2 from '../../public/icons/images/2.png'
import image3 from '../../public/icons/images/3.png'
import image4 from '../../public/icons/images/4.png'
import image5 from '../../public/icons/images/5.png'
import image6 from '../../public/icons/images/6.png'
import image7 from '../../public/icons/images/7.png'
import image8 from '../../public/icons/images/8.png'
import image9 from '../../public/icons/images/9.png'
import image10 from '../../public/icons/images/10.png'
import SampleNextArrow from '../studyStatusBanner/SampleNextArrow'
import SamplePrevArrow from '../studyStatusBanner/SamplePrevArrow'

const aboutLessons = [
   { id: 1, image: image8 },
   { id: 2, image: image10 },
   { id: 3, image: image9 },
   { id: 4, image: image2 },
   { id: 5, image: image1 },
   { id: 6, image: image4 },
   { id: 7, image: image3 },
   { id: 8, image: image5 },
   { id: 9, image: image7 },
   { id: 10, image: image6 },
]

export default function LessonsCarousel() {
   const [thumbsSwiper, setThumbsSwiper] = useState(null)
   const sliderRef = useRef(null)
   const [activeIndex, setActiveIndex] = useState()

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
         <div className={styles.prevArrow}>
            <SamplePrevArrow onClick={handlePrev} />
         </div>
         <div className={styles.nextArrow}>
            <SampleNextArrow onClick={handleNext} />
         </div>
         <Swiper
            ref={sliderRef}
            loop
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Thumbs]}
            className={styles.mySwiper2}
            breakpoints={{
               450: {
                  slidesPerView: 1,
               },
            }}
         >
            {aboutLessons.map((item) => (
               <SwiperSlide key={item.id}>
                  <Image src={item.image} loading="eager" />
               </SwiperSlide>
            ))}
         </Swiper>
         <Swiper
            onSwiper={setThumbsSwiper}
            loop
            spaceBetween={10}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Thumbs, Controller]}
            className={styles.mySwiper}
            mousewheel={{
               sensitivity: 1,
            }}
            grabCursor
            slideToClickedSlide
            breakpoints={{
               450: {
                  slidesPerView: 4,
               },
            }}
         >
            {aboutLessons.map((item, index) => (
               <SwiperSlide key={item.id}>
                  <div
                     className={`${styles.imagePagination} ${
                        index === activeIndex && styles.zoom
                     }`}
                  >
                     <Image src={item.image} loading="eager" />
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   )
}
