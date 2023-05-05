import { useState, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-scroll'
import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from './Header.module.css'
import instaLogo from '../../public/img/instaLogo.svg'
import whatsappLogo from '../../public/img/WhatsappLogo.svg'
import telegramLogo from '../../public/img/TelegramLogo.svg'
import NavBar from '../navBar/NavBar'
import Button from '../UI/button/Button'
import { Modal } from '../UI/modal/modalWindow/Modal'
import InformationForm from '../authorization/informationForm/InformationForm'
import SpinnerLoading from '../UI/loadingSpinner/LoadingSpinner'
import SuccessMessage from '../authorization/success/SuccessMessage'
import { generalActions, sendUserApplitaction } from '../../store/generalSlice'
import CodeYourFeaturSvg from './codeYourFeaturSvg/CodeYourFeaturSvg'

export default function Header() {
   const animationRef = useRef({
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
   })

   const [isModal, setIsModal] = useState(false)

   const {
      isLoading,
      userRequestError,
      succesUserRequest,
      allBanners,
      infoBanners,
   } = useSelector((state) => state.general)

   const banners = [...(allBanners || []), ...(infoBanners || [])] || []

   function getButtonTitle() {
      const isRegistrationBanner = banners.find((item) => 'createdDate' in item)
      return !!isRegistrationBanner
   }
   const modalHandler = () => setIsModal((prevState) => !prevState)

   const dispatch = useDispatch()

   const [successModal, setSuccessModal] = useState(false)
   const successModalHandler = () => setSuccessModal((prevState) => !prevState)

   async function sendApplication(userInformation) {
      dispatch(generalActions.removeUserResponse())
      dispatch(
         sendUserApplitaction({
            userInformation,
            setSuccessModal,
            modalHandler,
         })
      )
   }
   const getActiveBannersButton = useCallback(() => {
      if (getButtonTitle()) {
         return (
            <Link to="bannersID" smooth offset={-100} duration={500}>
               <Button
                  submission={
                     getButtonTitle() ? 'Регистрация' : 'Получить информацию'
                  }
                  className={styles.button}
               />
            </Link>
         )
      }
      return (
         <Button
            onClick={modalHandler}
            submission={
               getButtonTitle() ? 'Регистрация' : 'Получить информацию'
            }
            className={styles.button}
         />
      )
   }, [banners])

   return (
      <>
         <NavBar page="true" />
         <div className={styles.container}>
            <Modal isOpen={isModal} onCloseBackDrop={modalHandler}>
               <InformationForm
                  onClose={modalHandler}
                  onSubmitHadnler={sendApplication}
               />
            </Modal>
            <Modal isOpen={successModal} onCloseBackDrop={successModalHandler}>
               <SuccessMessage
                  responseMessage={{
                     success: succesUserRequest,
                     error: userRequestError,
                  }}
               />
            </Modal>
            <SpinnerLoading isLoading={isLoading} width={120} height={120} />
            <motion.div
               initial="hidden"
               whileInView="visible"
               variants={animationRef.current}
               viewport={{ once: true }}
               className={styles.wrapper}
               custom={3.1}
            >
               <div className={styles.content}>
                  <CodeYourFeaturSvg />
                  <motion.div
                     variants={animationRef.current}
                     custom={6}
                     className={styles.text}
                  >
                     <h1 className={styles.peakText}>
                        <span>P</span>
                        <span>E</span>
                        <span>A</span>
                        <span>K</span>
                     </h1>
                     <h1 className={styles.softText}>
                        <span>S</span>
                        <span>O</span>
                        <span>F</span>
                        <span>T</span>
                     </h1>
                  </motion.div>
                  <motion.div
                     variants={animationRef.current}
                     className={styles.house}
                     custom={7}
                  >
                     HOUSE MOSCOW
                  </motion.div>
                  {getActiveBannersButton()}
                  <div className={styles.socialSites}>
                     <div className={styles.instagram}>
                        <a
                           target="_blank"
                           href="https://www.instagram.com/peaksoft.moscow/"
                           rel="noreferrer"
                        >
                           <Image
                              className={styles.instaLogo}
                              target="blank"
                              src={instaLogo}
                           />
                        </a>
                     </div>
                     <div className={styles.whatsapp}>
                        <a
                           target="_blank"
                           href="https://wa.me/+79912245087"
                           rel="noreferrer"
                        >
                           <Image className={styles.logo} src={whatsappLogo} />
                        </a>
                     </div>
                     <div className={styles.telegram}>
                        <a
                           target="_blank"
                           href="https://t.me/+79912245087"
                           rel="noreferrer"
                        >
                           <Image src={telegramLogo} />
                        </a>
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>
      </>
   )
}
