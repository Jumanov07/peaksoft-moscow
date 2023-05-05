import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import styles from './ActiveBanners.module.css'
import Button from '../button/Button'
import { Modal } from '../modal/modalWindow/Modal'
import ApplicationForm from '../../authorization/applicationForm/ApplicationForm'
import InformationForm from '../../authorization/informationForm/InformationForm'
import {
   generalActions,
   sendStudentRegistrationForm,
   sendUserApplitaction,
} from '../../../store/generalSlice'
import SpinnerLoading from '../loadingSpinner/LoadingSpinner'
import SuccessMessage from '../../authorization/success/SuccessMessage'

function ActiveBanners({ banner }) {
   const dispatch = useDispatch()
   const { isLoading, userRequestError, succesUserRequest } = useSelector(
      (state) => state.general
   )
   const { bannerName, courseName, finishedDate, bannerId, imageLink } = banner

   const [isModal, setIsModal] = useState(false)
   const modalHandler = () => {
      setIsModal((prevState) => !prevState)
   }

   const [successModal, setSuccessModal] = useState(false)
   const successModalHandler = () => setSuccessModal((prevState) => !prevState)

   const getBannersButtonsOptions = () => {
      if (finishedDate) {
         return {
            bannerClassName: `${styles.registratoion}`,
            bannerTittle: 'Регистрация',
         }
      }
      return {
         bannerClassName: `${styles.information}`,
         bannerTittle: 'Получить информацию',
      }
   }

   const { bannerClassName, bannerTittle } = getBannersButtonsOptions()

   async function sendUserInformationForm(userInformation) {
      dispatch(generalActions.removeUserResponse())
      dispatch(
         sendUserApplitaction({
            userInformation,
            setSuccessModal,
            modalHandler,
         })
      )
   }

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

   const formTypes = {
      'Frontend/ Backend': (
         <ApplicationForm
            onClose={modalHandler}
            cancelSelect={false}
            submitHandler={sendUserFormRegistration}
            cancelTextArea={false}
         />
      ),
      'Компьютердик сабаттуулук': (
         <ApplicationForm
            onClose={modalHandler}
            cancelSelect
            submitHandler={sendUserFormRegistration}
            cancelTextArea
            cancelCheckbox
         />
      ),
      'Москва - Backend': (
         <ApplicationForm
            onClose={modalHandler}
            cancelSelect
            submitHandler={sendUserFormRegistration}
            cancelTextArea
         />
      ),
      'Балдар үчүн программалоо': (
         <ApplicationForm
            onClose={modalHandler}
            cancelSelect
            submitHandler={sendUserFormRegistration}
            cancelTextArea
            cancelCheckbox
         />
      ),
   }

   return (
      <>
         <SpinnerLoading isLoading={isLoading} width={120} height={120} />
         <Modal isOpen={isModal} onCloseBackDrop={modalHandler}>
            {finishedDate ? (
               formTypes[courseName]
            ) : (
               <InformationForm
                  onClose={modalHandler}
                  onSubmitHadnler={sendUserInformationForm}
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
         <div className={styles.content}>
            <span className={styles.imageStyles}>
               <Image
                  src={imageLink}
                  width={461}
                  objectFit="cover"
                  quality={100}
                  style={{ borderRadius: '5px' }}
                  alt="/banner image"
                  height={406}
                  loading="eager"
               />
            </span>
            <div className={styles.titleBox}>
               <p className={styles.title}>{bannerName}</p>
               <p className={styles.date} id={bannerId}>
                  {finishedDate
                     ? `Регистрация до ${finishedDate
                          .split('-')
                          .reverse()
                          .join('.')}`
                     : null}
               </p>
               <div className={styles.buttonContainer}>
                  <Button
                     onClick={modalHandler}
                     className={bannerClassName}
                     type="button"
                     submission={bannerTittle}
                  />
               </div>
            </div>
         </div>
      </>
   )
}

export default ActiveBanners
