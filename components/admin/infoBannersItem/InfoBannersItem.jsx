import Image from 'next/image'
import { useContext, useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import classes from './InfoBannersItem.module.css'
import UpdateInfoBanner from '../updateInfoBanner/UpdateInfoBanner'
import deleteIcon from '../../../public/adminIcons/deleteIcon.svg'
import editIcon from '../../../public/adminIcons/editIcon.svg'
import SwitchButton from '../../UI/switchButton/SwitchButton'
import { Modal } from '../../UI/modal/modalWindow/Modal'
import DeleteBannerLayout from '../deleteBannerLayout/DeleteBannerLayout'
import SpinnerLoading from '../../UI/loadingSpinner/LoadingSpinner'
import { baseFetch } from '../../../api/baseFetch'
import { BannerContext } from '../../../store/bannerContext'
import { sendWithFormDataToApi } from '../../../api/sendWithFormDataToApi'

export function InfoBannersItem({
   data: { bannerName, bannerId, courseName, isActive, imageLink },
   counter,
}) {
   const [isModal, setIsModal] = useState(false)
   const [updateModal, setIsUpdateModal] = useState(false)
   function updateModalHandler() {
      setIsUpdateModal((prevState) => !prevState)
   }
   const [isLoading, setIsLoading] = useState(false)
   function modalHandler() {
      setIsModal((prevState) => !prevState)
   }
   const adminCtx = useContext(BannerContext)
   async function onDeleteInfoBanner(bannerId) {
      try {
         setIsLoading(true)
         const responseOptions = {
            method: 'DELETE',
            path: `banners/delete/info-banner/${bannerId}`,
         }
         const response = await baseFetch(responseOptions)
         if (response.status) {
            const updatedInfoBannerList = adminCtx.infoBanners.filter(
               (item) => item.bannerId !== bannerId
            )
            adminCtx.getInfoBanners(updatedInfoBannerList)
            toast.success(`${response.message}`)
         }
         setIsLoading(false)
         modalHandler()
      } catch (error) {
         setIsLoading(false)
         toast.error(`${error.message}`)
      }
   }
   async function deactivateHandler(infoBanner) {
      const { id } = infoBanner
      try {
         setIsLoading(true)
         const responseOptions = {
            method: 'PUT',
            path: `banners/active/and/deactivate/${id}`,
         }
         const response = await baseFetch(responseOptions)
         if (response.status === 'OK') {
            const deactivatedInfoBanners = adminCtx.infoBanners.map((item) => {
               if (item.bannerId === id) {
                  return {
                     ...item,
                     isActive: !item.isActive,
                  }
               }
               return item
            })
            adminCtx.getInfoBanners(deactivatedInfoBanners)
            toast.success(`${bannerName} успешно изменен`)
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

   async function updateInfoBanner(updateBanner) {
      const { bannerImage, courseTypeId, description } = updateBanner
      const responseOptions = {
         method: 'PUT',
         path: `banners/update/info-banner/${bannerId}`,
      }
      setIsLoading(true)
      try {
         if (typeof bannerImage === 'string') {
            responseOptions.body = {
               imageId: 0,
               description,
               courseTypeId,
            }
         } else {
            const getImage = await sendWithFormDataToApi({ file: bannerImage })
            if (getImage.imageId) {
               responseOptions.body = {
                  imageId: getImage.imageId,
                  description,
                  courseTypeId,
               }
            }
         }
         const response = await baseFetch(responseOptions)
         if (response) {
            getBanners()
         }
         setIsLoading(false)
         updateModalHandler()
         toast.success(`${response.description} обновлён` || response.message)
      } catch (error) {
         setIsLoading(false)
         toast.error(`Ошибка сервера`)
      }
   }

   async function getBanners() {
      try {
         const bannersResonse = await baseFetch({
            method: 'GET',
            path: 'banners/find/info-banners',
         })
         if (bannersResonse) {
            adminCtx.getInfoBanners(bannersResonse)
         }
      } catch (error) {
         toast.error(error.message)
      }
   }
   return (
      <div>
         <Modal isOpen={isModal} onCloseBackDrop={modalHandler}>
            <DeleteBannerLayout
               onSubmitHandler={onDeleteInfoBanner}
               onCancelDelete={modalHandler}
               bannerInfo={{ bannerId, bannerName }}
            />
         </Modal>
         <Modal isOpen={updateModal} onCloseBackDrop={updateModalHandler}>
            <UpdateInfoBanner
               onCancelDelete={updateModalHandler}
               submitHandler={updateInfoBanner}
               banner={{
                  bannerName,
                  bannerId,
                  courseName,
                  imageLink,
               }}
               courseTypeId={getCoursTypeId()}
            />
         </Modal>
         <SpinnerLoading isLoading={isLoading} width={120} height={120} />
         <ul className={classes.listItem}>
            <li>{counter + 1}</li>
            <li>{bannerName}</li>
            <li>{courseName}</li>
            <li>
               <Image
                  onClick={updateModalHandler}
                  src={editIcon}
                  width={20}
                  height={20}
                  alt=""
               />
            </li>
            <li>
               <Image
                  src={deleteIcon}
                  width={20}
                  height={20}
                  alt=""
                  onClick={modalHandler}
               />
            </li>
            <li>
               <SwitchButton
                  onSwitchedRequestHandler={deactivateHandler}
                  id={bannerId}
                  view={isActive}
               />
            </li>
         </ul>
      </div>
   )
}
