/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import classes from './MainHeader.module.css'
import Button from '../button/Button'
import { compareEndDateOfBanner } from '../../../utils/helpers/helpers'
import {
   generalActions,
   sendStudentRegistrationForm,
   sendUserApplitaction,
} from '../../../store/generalSlice'
import SpinnerLoading from '../loadingSpinner/LoadingSpinner'
import { Modal } from '../modal/modalWindow/Modal'
import InformationForm from '../../authorization/informationForm/InformationForm'
import SuccessMessage from '../../authorization/success/SuccessMessage'
import ApplicationForm from '../../authorization/applicationForm/ApplicationForm'

const MainHeader = ({ title, introduction, url, courseName }) => {
   const { isLoading, userRequestError, succesUserRequest, allBanners } =
      useSelector((state) => state.general)
   const [banner, setBanner] = useState(null)

   const dispatch = useDispatch()
   const [isModal, setIsModal] = useState(false)
   const [successModal, setSuccessModal] = useState(false)
   const successModalHandler = () => setSuccessModal((prevState) => !prevState)
   const modalHandler = () => setIsModal((prevState) => !prevState)

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
         comment: 'Отсутствует',
         courseId: banner.courseTypeId,
         bannerId: banner.bannerId,
      }
      dispatch(generalActions.removeUserResponse())
      dispatch(
         sendStudentRegistrationForm({
            studentInfo,
            setSuccessModal,
            modalHandler,
         })
      )
   }
   const isBannerActive = compareEndDateOfBanner(banner?.endDateTime)

   const getBanner = useCallback(() => {
      const getActiveBanner = allBanners?.find(
         (item) => item.type === courseName
      )
      setBanner(getActiveBanner)
   }, [allBanners])

   useEffect(() => {
      getBanner()
   }, [allBanners])
   return (
      <>
         <SpinnerLoading isLoading={isLoading} width={120} height={120} />
         <Modal isOpen={isModal} onCloseBackDrop={modalHandler}>
            {isBannerActive ? (
               <ApplicationForm
                  onClose={modalHandler}
                  cancelSelect
                  submitHandler={sendUserFormRegistration}
                  cancelTextArea
               />
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
         <div className={classes.container}>
            <header className={classes.header}>
               <div className={classes.textContainer}>
                  <h1 className={classes.title}>{title}</h1>
                  <h2 className={classes.h2}>{introduction}</h2>
                  {isBannerActive ? (
                     <Button
                        className={classes.btn}
                        submission="Регистрация"
                        onClick={modalHandler}
                     />
                  ) : (
                     <Button
                        className={classes.btn}
                        submission="Получить информацию"
                        onClick={modalHandler}
                     />
                  )}
               </div>
               <div className={classes.img}>
                  <Image src={url} alt="computer" loading="lazy" />
               </div>
            </header>
         </div>
      </>
   )
}

export default MainHeader
