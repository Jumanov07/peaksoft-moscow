import { useRef, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import ActiveBanners from '../UI/activeBanners/ActiveBanners'
import styles from './StudyStatusBanner.module.css'
import SampleNextArrow from './SampleNextArrow'
import SamplePrevArrow from './SamplePrevArrow'
import { componentAnimationStyles } from '../../utils/animationStyles/animation'

function StudyStatusBanner() {
   // useSelector
   const { allBanners, infoBanners } = useSelector((state) => state.general)
   // animation
   const componentAnimationStylesRef = useRef(componentAnimationStyles)
   // banners
   const banners = [...(allBanners || []), ...(infoBanners || [])] || []
   const activeBanners = banners.filter((item) => item.isActive !== false)
   // slider controll
   const sliderRef = useRef(null)

   const getBannersLength = () => {
      const bannersLength = activeBanners.length > 2
      return bannersLength
   }

   const handlePrev = useCallback(() => {
      if (!sliderRef.current) return
      sliderRef.current.swiper.slidePrev()
   }, [])

   const handleNext = useCallback(() => {
      if (!sliderRef.current) return
      sliderRef.current.swiper.slideNext()
   }, [])

   const getSliders = () => {
      if (getBannersLength()) {
         return (
            <div className={styles.myCont}>
               <div className={styles.prevArrow} style={{ cursor: 'pointer' }}>
                  <SamplePrevArrow onClick={handlePrev} />
               </div>
               <div className={styles.nextArrow}>
                  <SampleNextArrow
                     onClick={handleNext}
                     style={{ cursor: 'pointer' }}
                  />
               </div>
               <Swiper
                  ref={sliderRef}
                  modules={[Navigation, Pagination, Autoplay]}
                  slidesPerView={1.2}
                  spaceBetween={0}
                  loop
                  simulateTouch
                  slideToClickedSlide
                  grabCursor
                  keyboard={{
                     enabled: true,
                     onlyInViewport: true,
                  }}
                  pagination={{
                     clickable: true,
                  }}
                  speed={1000}
                  autoplay={{ delay: 2500 }}
                  breakpoints={{
                     450: {
                        slidesPerView: 2.5,
                        spaceBetween: 10,
                        grabCursor: true,
                     },
                  }}
               >
                  {activeBanners.map((item) => (
                     <SwiperSlide key={item.bannerId}>
                        <ActiveBanners key={item.bannerId} banner={item} />
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>
         )
      }
      return (
         <div className={styles.responsiveContainer}>
            {activeBanners.map((item) => (
               <ActiveBanners key={item.bannerId} banner={item} />
            ))}
         </div>
      )
   }

   return (
      <motion.div
         className={styles.cont}
         initial="hidden"
         whileInView="visible"
         variants={componentAnimationStylesRef.current}
         custom={3}
         viewport={{ once: true }}
      >
         {activeBanners.length !== 0 && (
            <h1 className={styles.title} id="bannersID">
               Курстарга катталуу
            </h1>
         )}
         {getSliders()}
      </motion.div>
   )
}

export default StudyStatusBanner
