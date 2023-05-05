import { motion } from 'framer-motion'
import { useRef } from 'react'
import { componentAnimationStyles } from '../../../utils/animationStyles/animation'
import styles from './CodeYourFeaturSvg.module.css'
import PeaksoftCircleText from '../peaksoftCircleText/PeaksoftCircleText'

export default function CodeYourFeaturSvg() {
   const animationRef = useRef(componentAnimationStyles)
   return (
      <motion.div
         initial="hidden"
         whileInView="visible"
         variants={animationRef.current}
         custom={7}
         viewport={{ once: true }}
         className={styles.circle}
      >
         <PeaksoftCircleText />
      </motion.div>
   )
}
