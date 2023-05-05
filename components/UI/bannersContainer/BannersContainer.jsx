/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import StudyStatusBanner from '../../studyStatusBanner/StudyStatusBanner'
import classes from './BannersContainer.module.css'
import { componentAnimationStyles } from '../../../utils/animationStyles/animation'

export default function BannersContainer() {
   const textAnimationRef = useRef(componentAnimationStyles)
   const { allBanners, infoBanners } = useSelector((state) => state.general)

   const banners = [...(allBanners || []), ...(infoBanners || [])] || []
   const activeBanners = banners.filter(
      (item) => item.isActive !== false
   ).length

   const getContainerClassName = () => {
      if (activeBanners > 0) {
         return `${classes.container}`
      }
      return `${classes.noStylesContainer}`
   }
   return (
      <div className={getContainerClassName()}>
         <motion.div
            initial="hidden"
            whileInView="visible"
            variants={textAnimationRef.current}
            viewport={{ amount: 0.3, once: true }}
            className={classes.wrapper}
         >
            <StudyStatusBanner />
         </motion.div>
      </div>
   )
}
