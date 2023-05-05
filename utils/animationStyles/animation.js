export const componentAnimationStyles = {
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
}
export const componentFadeInAnimationStyles = {
   hidden: {
      opacity: 0,
   },
   visible: (custom) => ({
      opacity: 1,
      transition: {
         delay: custom * 0.3,
         bounce: 0.3,
         duration: 0.5,
      },
   }),
}
