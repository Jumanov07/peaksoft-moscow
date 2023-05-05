import { useCallback } from 'react'
import Image from 'next/image'
import classes from './SuccessMessage.module.css'
import instagram from '../../../public/instagram.svg'
import telegram from '../../../public/telegram.svg'
import whatsApp from '../../../public/whatsApp.svg'

export default function SuccessMessage({ responseMessage }) {
   const { error, success } = responseMessage
   const getSuccessMessage = useCallback(() => {
      let messageToStudent = null
      if (success !== null) {
         messageToStudent = (
            <>
               <h2 className={classes.aboutTitles}>
                  Сиздин тапшыруунуз <br /> кабыл алынды!
               </h2>
               <p className={classes.callToUserMessage}>
                  Сиз менен жакын арада байланышабыз.
               </p>
            </>
         )
      }
      if (error !== null) {
         messageToStudent = (
            <h2 className={classes.aboutTitles}>
               Сураныч,
               <br /> кайра аракет кылыңыз!
            </h2>
         )
      }
      return messageToStudent
   }, [success, error])
   return (
      <div className={classes.successMessageStyles}>
         <div />
         {getSuccessMessage()}
         <div className={classes.logoBox}>
            <a
               href="https://www.instagram.com/peaksoft.house/"
               title="instagram"
               target="_blank"
               rel="noreferrer"
            >
               <Image className={classes.logoStyles} src={instagram} />
            </a>
            <a
               href="https://t.me/+996500344433"
               title="telegram"
               target="_blank"
               rel="noreferrer"
            >
               <Image className={classes.logoStyles} src={telegram} />
            </a>
            <a
               href="https://wa.me/996500344433"
               title="whatsapp"
               target="_blank"
               rel="noreferrer"
            >
               <Image className={classes.logoStyles} src={whatsApp} />
            </a>
         </div>
      </div>
   )
}
