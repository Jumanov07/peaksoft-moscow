import React, { useCallback, useContext, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { Modal } from '../../UI/modal/modalWindow/Modal'
import SwitchButton from '../../UI/switchButton/SwitchButton'
import DeleteBannerLayout from '../deleteBannerLayout/DeleteBannerLayout'
import classes from './BannerListItem.module.css'
import editIcon from '../../../public/adminIcons/editIcon.svg'
import deleteIcon from '../../../public/adminIcons/deleteIcon.svg'
import SpinnerLoading from '../../UI/loadingSpinner/LoadingSpinner'
import { baseFetch } from '../../../api/baseFetch'
import { BannerContext } from '../../../store/bannerContext'
import UpdateBannerItemForm from '../updateBannerItem/UpdateBannerItemForm'
import { sendWithFormDataToApi } from '../../../api/sendWithFormDataToApi'

const BannerListItem = ({ banner, counter }) => {
   const {
      bannerId,
      bannerName,
      courseName,
      createdDate,
      finishedDate,
      isActive,
   } = banner

   const adminCtx = useContext(BannerContext)
   const [isLoading, setIsLoading] = useState(false)
   const [isModal, setIsModal] = useState(false)
   const [updateModal, setIsUpdateModal] = useState(false)
   const updateModalHandler = () => setIsUpdateModal((prevState) => !prevState)
   const modalHandler = () => setIsModal((prevState) => !prevState)

   async function bannerDeleteHandler(bannerId) {
      try {
         setIsLoading(true)
         const responseOptions = {
            method: 'DELETE',
            path: `banners/delete/${bannerId}`,
         }
         const response = await baseFetch(responseOptions)
         if (response.status) {
            const updatedBanners = adminCtx.banners.filter(
               (item) => item.bannerId !== bannerId
            )
            adminCtx.getBanners(updatedBanners)
            toast.success(`${bannerName} успешно удален`)
         }
         setIsLoading(false)
         modalHandler()
      } catch (error) {
         setIsLoading(false)
         modalHandler()
         toast.error(`${error.message}`)
      }
   }

   async function updateActiveBunnerHandler({ id }) {
      try {
         setIsLoading(true)
         const responseOptions = {
            path: `banners/active/and/deactivate/${id}`,
            method: 'PUT',
         }
         const response = await baseFetch(responseOptions)
         if (response.status === 'OK') {
            const deactivatedInfoBanners = adminCtx.banners.map((item) => {
               if (item.bannerId === id) {
                  return {
                     ...item,
                     isActive: !item.isActive,
                  }
               }
               return item
            })
            adminCtx.getBanners(deactivatedInfoBanners)
            toast.success(`${response.message}`)
         }
         setIsLoading(false)
      } catch (error) {
         setIsLoading(false)
         toast.error(`Ошибка сервера`)
      }
   }
   const getCoursTypeId = useCallback(() => {
      const getCoursTypeId = adminCtx.courses.filter(
         (item) => item.courseType === courseName
      )
      return getCoursTypeId
   }, [adminCtx.courses])

   async function updateBannerHandler(updateBanner) {
      const { bannerImage, courseTypeId, description, endDate, startDate } =
         updateBanner
      const responseOptions = {
         method: 'PUT',
         path: `banners/update/registration-banner/${bannerId}`,
      }
      setIsLoading(true)
      try {
         if (typeof bannerImage === 'string') {
            responseOptions.body = {
               imageId: 0,
               description,
               courseTypeId,
               startDate,
               endDate,
            }
         } else {
            const getImage = await sendWithFormDataToApi({ file: bannerImage })
            if (getImage.imageId) {
               responseOptions.body = {
                  imageId: getImage.imageId,
                  description,
                  courseTypeId,
                  startDate,
                  endDate,
               }
            }
         }
         const response = await baseFetch(responseOptions)
         setIsLoading(false)
         toast.success(`${response.description} обновлён` || response.message)
         updateModalHandler()
         getBanners()
      } catch (error) {
         setIsLoading(false)
         toast.error(`Ошибка сервера`)
      }
   }

   async function getBanners() {
      try {
         const bannersResonse = await baseFetch({
            method: 'GET',
            path: 'banners/find/registration-banners',
         })
         const reponse = await bannersResonse
         adminCtx.getBanners(reponse)
      } catch (error) {
         toast.error(error.message)
      }
   }

   return (
      <>
         <Modal isOpen={isModal} onCloseBackDrop={modalHandler}>
            <DeleteBannerLayout
               onSubmitHandler={bannerDeleteHandler}
               onCancelDelete={modalHandler}
               bannerInfo={{ bannerId, bannerName }}
            />
         </Modal>
         <Modal isOpen={updateModal} onCloseBackDrop={updateModalHandler}>
            <UpdateBannerItemForm
               onCancelDelete={updateModalHandler}
               onSubmitHandler={updateBannerHandler}
               banner={banner}
               courseTypeId={getCoursTypeId()}
            />
         </Modal>
         <SpinnerLoading isLoading={isLoading} width={120} height={120} />
         <div className={classes.listItem}>
            <span className={classes.counter}>{counter + 1}</span>
            <Link
               href={{
                  pathname: `/banners/${bannerId}`,
                  query: { bannerId, bannerName },
               }}
            >
               <a>{bannerName}</a>
            </Link>

            <ul className={classes.coursInfo}>
               <li>
                  <Link
                     href={{
                        pathname: `/banners/${bannerId}`,
                        query: { bannerId, bannerName },
                     }}
                  >
                     <a>{courseName}</a>
                  </Link>
               </li>
               <li>{createdDate}</li>
               <li>{finishedDate}</li>
            </ul>
            <div className={classes.actionControll}>
               <Image
                  src={editIcon.src}
                  width={20}
                  height={20}
                  onClick={updateModalHandler}
                  alt="editIcon"
               />
               <Image
                  src={deleteIcon.src}
                  onClick={modalHandler}
                  width={20}
                  height={20}
                  alt="editIcon"
               />
               <SwitchButton
                  id={bannerId}
                  view={isActive}
                  onSwitchedRequestHandler={updateActiveBunnerHandler}
               />
            </div>
         </div>
      </>
   )
}
export default BannerListItem
