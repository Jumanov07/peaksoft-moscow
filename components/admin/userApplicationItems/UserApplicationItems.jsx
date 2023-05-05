import { useCallback, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import Image from 'next/image'
import Checkbox from '../../UI/checkbox/Checkbox'
import classes from './UserApplicationItems.module.css'
import deleteIcon from '../../../public/adminIcons/deleteIcon.svg'
import { Modal } from '../../UI/modal/modalWindow/Modal'
import DeleteBannerLayout from '../deleteBannerLayout/DeleteBannerLayout'
import { baseFetch } from '../../../api/baseFetch'
import { BannerContext } from '../../../store/bannerContext'
import SpinnerLoading from '../../UI/loadingSpinner/LoadingSpinner'
import ExcelCheckbox from '../../UI/excelCheckbox/ExcelCheckbox'

export default function UserApplicationItems({ item, counter, handleClick }) {
   const adminCtx = useContext(BannerContext)
   const [isLoading, setIsLoading] = useState(false)

   const dateCut = useCallback(() => {
      const cuttedDate = item.registeredAt.slice(0, 10)
      return cuttedDate.split('-').reverse().join('.')
   }, [item])

   async function deleteUser(id) {
      const responseOptions = {
         method: 'DELETE',
         path: `consultations/delete/${id}`,
      }
      setIsLoading(true)
      try {
         const response = await baseFetch(responseOptions)
         if (response.status === 'OK') {
            const updatedApplications = adminCtx.applications.filter(
               (item) => item.id !== id
            )
            adminCtx.getApplications(updatedApplications)
         }
         setIsLoading(false)
         toast.success(`${response.message}`)
         modalHandler()
         return response
      } catch (error) {
         setIsLoading(false)
         modalHandler()
         toast.error(`${error.message}`)
         return error
      }
   }
   const [isModal, setIsModal] = useState(false)
   const modalHandler = () => setIsModal((prevState) => !prevState)
   const userInfo = { bannerName: item.name, bannerId: item.id }

   async function onProcessedHandler(userInfo) {
      const requestOptions = {
         method: 'PUT',
         path: `consultations/switchAnswer/${userInfo.id}`,
      }
      try {
         setIsLoading(true)
         const response = await baseFetch(requestOptions)
         if (response.status === 'OK') {
            const updatedUser = adminCtx.applications.map((item) => {
               if (item.id === userInfo.id) {
                  return {
                     ...item,
                     isAnswered: !item.isAnswered,
                  }
               }
               return item
            })
            adminCtx.getApplications(updatedUser)
         }
         setIsLoading(false)
         toast.success(`${response.message}`)
         return response
      } catch (error) {
         setIsLoading(false)
         toast.error(`${error.message}`)
         return error
      }
   }
   return (
      <>
         <Modal isOpen={isModal} onCloseBackDrop={modalHandler}>
            <DeleteBannerLayout
               bannerInfo={userInfo}
               onCancelDelete={modalHandler}
               onSubmitHandler={deleteUser}
            />
         </Modal>
         <SpinnerLoading isLoading={isLoading} width={120} height={120} />
         <ul className={classes.itemsWrapper}>
            <li>
               <ExcelCheckbox
                  key={counter}
                  id={item.id}
                  type="checkbox"
                  handleClick={handleClick}
                  isChecked={adminCtx.isChecked.includes(item.id)}
                  name={counter}
               />
            </li>
            <li>{counter + 1}</li>
            <li>{item.name}</li>
            <li>{dateCut()}</li>
            <li>{item.phone}</li>
            <li>{item.courseType}</li>
            <li>
               <Checkbox
                  checked={item.isAnswered}
                  id={item.id}
                  onCheckedRequestHandler={onProcessedHandler}
               />
            </li>
            <li onClick={modalHandler} className={classes.deleteIconStyles}>
               <Image src={deleteIcon} />
            </li>
         </ul>
      </>
   )
}
