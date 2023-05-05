import Image from 'next/image'
import { Link } from 'react-scroll'
import React from 'react'
import styles from './Footer.module.css'
import logo from '../../public/Logo.svg'
import instagram from '../../public/instagram.svg'
import telegram from '../../public/telegram.svg'
import whatsApp from '../../public/whatsApp.svg'
import location from '../../public/location.svg'
import message from '../../public/message.svg'
import phone from '../../public/phone.svg'
import clock from '../../public/clock.svg'

export default function Footer() {
   return (
      <div className={styles.forBg}>
         <footer className={styles.container}>
            <div className={styles.forDisplay}>
               <div>
                  <div className={styles.img}>
                     <Image loading="lazy" src={logo} />
                  </div>
               </div>
               <div className={styles.contacts}>
                  <div>
                     <Link to="about" spy smooth offset={-100} duration={1500}>
                        <h4>О нас</h4>
                     </Link>
                     <Link
                        to="itCourse"
                        spy
                        smooth
                        offset={-25}
                        duration={1500}
                     >
                        <h4>IT курсы</h4>
                     </Link>
                     <Link
                        to="graduates"
                        spy
                        smooth
                        offset={-300}
                        duration={1500}
                     >
                        <h4>Наши выпускники</h4>
                     </Link>
                  </div>
                  <div className={styles.connecting}>
                     <h4>
                        <Image loading="lazy" src={phone} />
                        <a href="tel:+7991224-50-87">+7 991 224-50-87</a>
                     </h4>
                     <h4>
                        <Image loading="lazy" src={message} />
                        <a href="mailto: moscow@peaksoft.us">
                           moscow@peaksoft.us
                        </a>
                     </h4>
                     <h4>
                        <Image loading="lazy" src={clock} />
                        <a href="#">График работы: Пн-Сб. с 11:00 до 22:00</a>
                     </h4>
                     <h4>
                        <Image loading="lazy" src={location} />
                        <a
                           href="https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%9C%D0%B5%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2%D0%B0,+3+%D0%BA%D0%BE%D1%80%D0%BF%D1%83%D1%81+2,+%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0,+%D0%9C%D0%BE%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB.,+%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F,+109316/@55.7267228,37.6750805,17z/data=!3m1!4b1!4m5!3m4!1s0x46b54ad6e9a7209f:0x6b4d62eba6346bb0!8m2!3d55.7267228!4d37.6750805"
                           target="_blank"
                           rel="noreferrer"
                        >
                           г. Москва метро Римская, <br /> ул Шоссе Энтузиастов
                           д7, 3 подъезд, 4 этаж
                        </a>
                     </h4>
                  </div>
                  <div className={styles.social}>
                     <a
                        target="_blank"
                        href="https://www.instagram.com/peaksoft.moscow/"
                        rel="noreferrer"
                     >
                        <Image loading="lazy" src={instagram} />
                     </a>
                     <a
                        target="_blank"
                        href="https://t.me/+79912245087"
                        rel="noreferrer"
                     >
                        <Image loading="lazy" src={telegram} />
                     </a>
                     <a
                        target="_blank"
                        href="https://wa.me/+79912245087"
                        rel="noreferrer"
                     >
                        <Image loading="lazy" src={whatsApp} />
                     </a>
                  </div>
               </div>
            </div>
            <p className={styles.copyright}>
               © Copyright PeakSoft. All Rights Reserved
            </p>
         </footer>
      </div>
   )
}
