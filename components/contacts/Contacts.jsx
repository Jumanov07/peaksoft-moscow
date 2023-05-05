import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import InformationForm from '../authorization/informationForm/InformationForm'
import SuccessMessage from '../authorization/success/SuccessMessage'
import { Modal } from '../UI/modal/modalWindow/Modal'
import styles from './Contacts.module.css'
import { generalActions, sendUserApplitaction } from '../../store/generalSlice'
import SpinnerLoading from '../UI/loadingSpinner/LoadingSpinner'
import LoadingIcon from '../UI/loadingIcon/LoadingIcon'

function Contacts() {
   const [ref, inView] = useInView({
      threshold: 0,
      triggerOnce: true,
   })
   const { isLoading, userRequestError, succesUserRequest } = useSelector(
      (state) => state.general
   )
   const [isLoadingMap, setIsLoadingMap] = useState(false)
   const componentAnimationRef = useRef({
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

   const dispatch = useDispatch()
   // modal
   const [isModal, setSuccessModal] = useState(false)
   const modalHandler = () => setSuccessModal((prevState) => !prevState)

   async function sendApplication(userInformation) {
      dispatch(generalActions.removeUserResponse())
      dispatch(
         sendUserApplitaction({
            userInformation,
            setSuccessModal,
         })
      )
   }

   const isShowModalMessage = userRequestError || succesUserRequest
   return (
      <motion.div
         id="contacts"
         ref={ref}
         className={styles.container}
         initial="hidden"
         whileInView="visible"
         variants={componentAnimationRef.current}
         viewport={{ once: false }}
         custom={2}
      >
         <SpinnerLoading isLoading={isLoading} width={120} height={120} />
         {isShowModalMessage && (
            <Modal isOpen={isModal} onCloseBackDrop={modalHandler}>
               <SuccessMessage
                  responseMessage={{
                     success: succesUserRequest,
                     error: userRequestError,
                  }}
               />
            </Modal>
         )}
         <h2 className={styles.title}>Контакты</h2>
         <motion.div
            variants={componentAnimationRef.current}
            custom={4}
            className={styles.contactSection}
         >
            <div className={styles.informationForm}>
               <InformationForm
                  cancelButton
                  className={styles.button}
                  onSubmitHadnler={sendApplication}
               />
            </div>
            <div className={styles.mapContainer}>
               {inView && (
                  <YMaps>
                     <Map
                        onLoad={() => setIsLoadingMap(true)}
                        className={styles.map}
                        defaultState={{
                           center: [42.875903, 74.628396],
                           zoom: 17,
                        }}
                        style={{ border: '1px solid silver' }}
                     >
                        <Placemark
                           geometry={[42.875903, 74.628396]}
                           properties={{
                              iconContent: 'Peaksoft House',
                           }}
                           options={{
                              preset: 'islands#blackStretchyIcon',
                              draggable: false,
                           }}
                        />
                     </Map>
                  </YMaps>
               )}
               {!isLoadingMap && <LoadingIcon />}
            </div>
         </motion.div>
      </motion.div>
   )
}

export default Contacts
