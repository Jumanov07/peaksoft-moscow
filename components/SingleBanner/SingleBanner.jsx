import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
   generalActions,
   sendStudentRegistrationForm,
   sendUserApplitaction,
} from '../../store/generalSlice'
import Button from '../UI/button/Button'
import styles from './SingleBanner.module.css'
import SpinnerLoading from '../UI/loadingSpinner/LoadingSpinner'
import { Modal } from '../UI/modal/modalWindow/Modal'
import ApplicationForm from '../authorization/applicationForm/ApplicationForm'
import SuccessMessage from '../authorization/success/SuccessMessage'
import bannersBackgroundImage from '../../public/img/neoImage.jpg'
import InformationForm from '../authorization/informationForm/InformationForm'
import singleBannerSvg from '../../public/singleBanner.jpg'

export default function SingleBanner({ banner }) {
   const [singleBanner] = useState(...banner)
   const { bannerId, bannerName, finishedDate } = singleBanner
   const [isModal, setIsModal] = useState(false)
   const [successModal, setSuccessModal] = useState(false)

   const modalHandler = () => setIsModal((prevState) => !prevState)
   const successModalHandler = () => setSuccessModal((prevState) => !prevState)
   const dispatch = useDispatch()
   const { succesUserRequest, userRequestError, isLoading } = useSelector(
      (state) => state.general
   )

   const date = finishedDate
      ? `${finishedDate.split('-').reverse().join('.')}`
      : ''

   async function sendUserFormRegistration({
      birthDate,
      surname,
      email,
      phone,
      name,
      offline,
      direction,
      desciption,
      additionalPhone,
   }) {
      const studentInfoWithCourseType = {
         name,
         surname,
         email,
         phone,
         studyFormat: offline ? 'OFFLINE' : 'ONLINE',
         courseTypeId: +direction,
         reason: desciption || 'Привет ',
         bannerId,
         dateOfBirth: birthDate,
         additionalPhone,
      }
      const { courseTypeId, ...withOutCourseTypeStudentInfo } =
         studentInfoWithCourseType

      const studentInfo = direction
         ? studentInfoWithCourseType
         : withOutCourseTypeStudentInfo

      dispatch(generalActions.removeUserResponse())
      dispatch(
         sendStudentRegistrationForm({
            studentInfo,
            setSuccessModal,
            modalHandler,
         })
      )
   }
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
   const animationRef = useRef({
      hidden: {
         x: -100,
         opacity: 0,
      },
      visible: (custom) => ({
         x: 0,
         opacity: 1,
         transition: {
            delay: custom * 0.3,
            bounce: 0.3,
            duration: 0.5,
         },
      }),
   })
   const textAnimationRef = useRef({
      hidden: {
         x: -100,
         opacity: 0,
      },
      visible: (custom) => ({
         x: 0,
         opacity: 1,
         transition: { delay: custom * 0.2 },
      }),
   })

   function getBannersComponent() {
      if (finishedDate) {
         return (
            <>
               <motion.h1
                  variants={animationRef.current}
                  current={1}
                  className={styles.title}
               >
                  {bannerName}
               </motion.h1>
               <motion.p
                  variants={animationRef.current}
                  current={1.5}
                  className={styles.description}
               >
                  Каттоo:
                  <span className={styles.date}>{date}</span> чейин
               </motion.p>
               <div className={styles.buttonBox}>
                  <Button
                     className={styles.button}
                     type="button"
                     submission="Регистрация"
                     onClick={modalHandler}
                  />
               </div>
            </>
         )
      }
      return (
         <>
            <motion.h1
               variants={animationRef.current}
               current={1}
               className={styles.title2}
            >
               {bannerName}
            </motion.h1>
            <div className={styles.buttonBox}>
               <Button
                  className={styles.button}
                  type="button"
                  submission="Получить информацию"
                  onClick={modalHandler}
               />
            </div>
         </>
      )
   }

   return (
      <>
         <SpinnerLoading isLoading={isLoading} width={120} height={120} />
         <Modal isOpen={isModal} onCloseBackDrop={modalHandler}>
            {finishedDate ? (
               <ApplicationForm
                  onClose={modalHandler}
                  cancelSelect={false}
                  submitHandler={sendUserFormRegistration}
               />
            ) : (
               <InformationForm
                  onSubmitHadnler={sendApplication}
                  onClose={modalHandler}
               />
            )}
         </Modal>
         <Modal isOpen={successModal} onCloseBackDrop={successModalHandler}>
            <SuccessMessage
               responseMessage={{
                  success: succesUserRequest,
                  error: userRequestError,
               }}
            />
         </Modal>
         <div className={styles.container}>
            <div className={styles.backgroundImage}>
               <Image
                  src={bannersBackgroundImage}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  srcSet={bannersBackgroundImage}
               />
            </div>
            <div className={styles.mobileBackgroundImage}>
               <Image
                  src={singleBannerSvg}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  srcSet={singleBannerSvg}
               />
            </div>
            <div className={styles.wrapper}>
               <motion.div
                  initial="hidden"
                  whileInView="visible"
                  variants={textAnimationRef.current}
                  viewport={{ once: true }}
                  className={styles.content}
               >
                  {getBannersComponent()}
               </motion.div>
            </div>
         </div>
      </>
   )
}
