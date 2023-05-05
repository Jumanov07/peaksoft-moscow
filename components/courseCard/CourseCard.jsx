import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from './CourseCard.module.css'
import backEndIcon1 from '../../public/img/javaIcon1.svg'
import backEndIcon2 from '../../public/img/javaIcon2.svg'
import backEndIcon3 from '../../public/img/javaIcon3.svg'
import backEndIcon4 from '../../public/img/javaIcon4.svg'
import backEndIcon5 from '../../public/img/javaIcon5.svg'
import compIcon1 from '../../public/img/compIcon1.svg'
import compIcon2 from '../../public/img/compIcon2.svg'
import compIcon3 from '../../public/img/compIcon3.svg'
import compIcon4 from '../../public/img/compIcon4.svg'
import compIcon5 from '../../public/img/compIcon5.svg'
import compIcon6 from '../../public/img/compIcon6.svg'
import compIcon7 from '../../public/img/compIcon7.svg'
import compIcon8 from '../../public/img/compIcon8.svg'
import compIcon9 from '../../public/img/compIcon9.svg'
import vector from '../../public/icons/down.svg'
import CountDownTimer from '../countDownTimer/CountDownTimer'
import { Modal } from '../UI/modal/modalWindow/Modal'
import SuccessMessage from '../authorization/success/SuccessMessage'
import SpinnerLoading from '../UI/loadingSpinner/LoadingSpinner'
// import { compareEndDateOfBanner } from '../../utils/helpers/helpers'
import {
   generalActions,
   sendStudentRegistrationForm,
   sendUserApplitaction,
} from '../../store/generalSlice'
import ApplicationForm from '../authorization/applicationForm/ApplicationForm'
import InformationForm from '../authorization/informationForm/InformationForm'
import Button from '../UI/button/Button'

const bakcEndCardData = {
   priceOffline: '12 000 p',
   priceOnline: '8 000 p',
   month: '- 9 Месяцев',
   name: 'Back-End',
   technology: [
      { id: 1, name: 'Java', photo: backEndIcon1 },
      { id: 2, name: 'JDBC', photo: backEndIcon1 },
      { id: 3, name: 'Hibernate', photo: backEndIcon2 },
      { id: 4, name: 'Spring MVC', photo: backEndIcon3 },
      { id: 5, name: 'Spring Security', photo: backEndIcon4 },
      { id: 6, name: 'Spring Boot', photo: backEndIcon5 },
   ],
   key: 'Back-End',
}

const compLiteracyCard = {
   priceOffline: '5 000 р',
   priceOnline: '4 000 р',
   month: '- 5 недель',
   name: `Компьютердик сабаттуулук`,
   technology: [
      { id: 1, name: 'Windows', photo: compIcon1 },
      { id: 2, name: 'Google', photo: compIcon2 },
      { id: 3, name: 'Gmail', photo: compIcon3 },
      { id: 4, name: 'Диск', photo: compIcon4 },
      { id: 5, name: 'Google Cloud', photo: compIcon5 },
      { id: 6, name: 'Word', photo: compIcon6 },
      { id: 7, name: 'Excel', photo: compIcon7 },
      { id: 8, name: 'PowerPont', photo: compIcon8 },
      { id: 9, name: 'Google Forms', photo: compIcon9 },
   ],
   key: 'компьютердик сабаттуулук',
}

function CourseCard({ course, type }) {
   const { isLoading, userRequestError, succesUserRequest, allBanners } =
      useSelector((state) => state.general)

   const dispatch = useDispatch()
   const [successModal, setSuccessModal] = useState(false)
   const [isModal, setIsModal] = useState(false)
   const modalHandler = () => setIsModal((prevState) => !prevState)
   const successModalHandler = () => setSuccessModal((prevState) => !prevState)
   const dataForCard = course === 'backend' ? bakcEndCardData : compLiteracyCard

   const [isActiveBanner, setIsActiveBanner] = useState(null)

   function getActiveBanner() {
      const activeBanner = allBanners.find((item) => item.type === type)
      setIsActiveBanner(activeBanner)
   }

   useEffect(() => {
      getActiveBanner()
   }, [allBanners])

   const [isTimeUp, setIsTimeUp] = useState(false)
   const stopTimer = () => setIsTimeUp(true)

   const sendUserFormRegistration = async (data) => {
      const studentInfo = {
         name: data.name,
         lastName: data.surname,
         phoneNumber: data.phone,
         dateOfBirth: data.birthDate,
         email: data.email,
         format: data.offline === false ? 'ONLINE' : 'OFFLINE',
         extraPhoneNumber: data.additionalPhone
            ? data.additionalPhone
            : 'Отсутствует',
         courseId: isActiveBanner.courseTypeId,
         comment: 'Отсутствует',
         bannerId: isActiveBanner.bannerId,
      }
      dispatch(generalActions.removeUserResponse())
      dispatch(
         sendStudentRegistrationForm({
            bannerId: isActiveBanner.bannerId,
            studentInfo,
            setSuccessModal,
            modalHandler,
         })
      )
   }

   const formTypes = {
      'Back-End': (
         <ApplicationForm
            onClose={modalHandler}
            cancelSelect
            submitHandler={sendUserFormRegistration}
            cancelTextArea
         />
      ),
      'компьютердик сабаттуулук': (
         <ApplicationForm
            onClose={modalHandler}
            cancelSelect
            submitHandler={sendUserFormRegistration}
            cancelTextArea
            cancelCheckbox
         />
      ),
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
   const renderCardActions = () => {
      return !isTimeUp ? (
         <Button submission="Регистрация" onClick={modalHandler} />
      ) : (
         <Button submission="Получить информацию" onClick={modalHandler} />
      )
   }

   const componentAnimationRef = useRef({
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
   })

   return (
      <>
         <SpinnerLoading isLoading={isLoading} width={120} height={120} />
         <Modal isOpen={isModal} onCloseBackDrop={modalHandler}>
            {!isTimeUp ? (
               formTypes[dataForCard.key]
            ) : (
               <InformationForm
                  onClose={modalHandler}
                  onSubmitHadnler={sendApplication}
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
         <motion.div
            initial="hidden"
            whileInView="visible"
            variants={componentAnimationRef.current}
            viewport={{ once: true }}
            className={styles.container}
         >
            {!isTimeUp && (
               <CountDownTimer
                  expiryTimestamp={
                     isActiveBanner?.endDateTime
                        ? new Date(isActiveBanner.endDateTime)
                        : new Date()
                  }
                  stopTimer={stopTimer}
               />
            )}
            <div className={styles.text}>
               <div className={styles.title}>
                  {dataForCard.name}
                  <span className={styles.month}> {dataForCard.month}</span>
               </div>
               <div className={styles.priceBox}>
                  <div className={styles.prices}>
                     <div className={styles.typeOfCourse}>Офлайн</div>
                     <div className={styles.price}>
                        {dataForCard.priceOffline}
                     </div>
                  </div>
                  <div className={styles.prices}>
                     <div className={styles.typeOfCourse}>Онлайн</div>
                     <div className={styles.price}>
                        {dataForCard.priceOnline}
                     </div>
                  </div>
               </div>
            </div>
            <motion.div
               initial="hidden"
               whileInView="visible"
               variants={componentAnimationRef.current}
               viewport={{ once: true }}
               className={styles.parentBox}
            >
               {dataForCard.technology.map((el, index) => (
                  <motion.div
                     custom={index + 1.5}
                     variants={componentAnimationRef.current}
                     key={el.id}
                     className={styles.box}
                  >
                     <div className={styles.iconBox}>
                        <Image src={el.photo} loading="lazy" />
                     </div>
                     <p>{el.name}</p>
                  </motion.div>
               ))}
            </motion.div>
            <div className={styles.footerBtn}>
               <div
                  className={styles.monthCourse}
                  // onClick={() => navigateToInnerCoursePage(activeBanner)}
               >
                  <Link href={course}>
                     <a>Полная информация</a>
                  </Link>
                  <div>
                     <Image className={styles.img} src={vector} />
                  </div>
               </div>
               {renderCardActions()}
            </div>
         </motion.div>
      </>
   )
}
export default CourseCard
