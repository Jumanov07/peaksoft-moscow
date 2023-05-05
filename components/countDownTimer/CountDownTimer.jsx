import React, { useEffect } from 'react'
import { useTimer } from 'react-timer-hook'
import classes from './CountDownTimer.module.css'

const targetTime = new Date()

const CountDownTimer = ({ expiryTimestamp = targetTime, stopTimer }) => {
   const { seconds, minutes, hours, days, restart } = useTimer({
      expiryTimestamp,
      onExpire: stopTimer,
   })
   useEffect(() => {
      restart(expiryTimestamp)
   }, [expiryTimestamp])

   return (
      <div className={classes.container}>
         <p className={classes.p}>КАТТАЛУУ БАШТАЛДЫ</p>
         <div>
            <p className={classes.forTimer}>
               <span>{days.toString().padStart(2, 0)} : </span>
               <span>{hours.toString().padStart(2, 0)} : </span>
               <span>{minutes.toString().padStart(2, 0)} : </span>
               <span>{seconds.toString().padStart(2, 0)}</span>
            </p>
            <p className={classes.days}>
               <span>Кун</span>
               <span>Саат</span>
               <span>Мин.</span>
               <span>Сек.</span>
            </p>
         </div>
      </div>
   )
}

export default CountDownTimer
