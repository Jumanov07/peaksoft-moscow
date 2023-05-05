import Link from 'next/link'
import Image from 'next/image'
import styles from './Whatsapp.module.css'
import whatsappIcon from '../../public/img/whatsappIcon.svg'

function Whatsapp() {
   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <div className={styles.pulse}>
               <Link href="https://wa.me/+79912245087">
                  <div className={styles.icon}>
                     <Image src={whatsappIcon} />
                  </div>
               </Link>
            </div>
         </div>
      </div>
   )
}

export default Whatsapp
