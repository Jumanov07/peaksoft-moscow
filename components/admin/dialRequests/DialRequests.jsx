import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import Image from 'next/image'
import classes from './DialRequest.module.css'
import deleteIcon from '../../../public/adminIcons/deleteIcon.svg'
import ExcelCheckbox from '../../UI/excelCheckbox/ExcelCheckbox'
import { Modal } from '../../UI/modal/modalWindow/Modal'
import DeleteBannerLayout from '../deleteBannerLayout/DeleteBannerLayout'
import SpinnerLoading from '../../UI/loadingSpinner/LoadingSpinner'
import { BannerContext } from '../../../store/bannerContext'
import { baseFetch } from '../../../api/baseFetch'

export default function DialRequests({ children, onSelectAll }) {
   const { query } = useRouter()
   const adminCtx = useContext(BannerContext)
   const [isModal, setIsModal] = useState(false)
   const modalHandler = () => setIsModal((prevState) => !prevState)
   const [isLoading, setIsLoading] = useState(false)
   async function deleteStudents() {
      if (adminCtx.checkedStudent.length === 0) {
         toast.error('Выделите студентов')
         return
      }
      setIsLoading(true)
      try {
         const requestOptions = {
            method: 'DELETE',
            path: 'students/delete-students',
            body: { studentsId: adminCtx.checkedStudent },
         }
         const response = await baseFetch(requestOptions)
         if (response.status === 'OK') {
            getBannersStudent()
            onSelectAll(false)
            adminCtx.getCheckedStudents([])
            toast.success(response.message)
         }
         modalHandler()
         setIsLoading(false)
      } catch (error) {
         setIsLoading(false)
         modalHandler()
         toast.error('Не удалось загрузить заявки')
      }
   }
   async function getBannersStudent() {
      try {
         const bannersStudentsResponse = await baseFetch({
            method: 'GET',
            path: `students/${query.bannerId}`,
         })
         if (bannersStudentsResponse) {
            adminCtx.getBannersStudents(bannersStudentsResponse)
         }
      } catch (error) {
         toast.error('Не удалось загрузить заявки' || error)
      }
   }
   return (
      <>
         <Modal isOpen={isModal} onCloseBackDrop={modalHandler}>
            <DeleteBannerLayout
               onSubmitHandler={deleteStudents}
               bannerInfo={{ bannerName: 'выделенные заявки', bannerId: 0 }}
               onCancelDelete={modalHandler}
            />
         </Modal>
         <SpinnerLoading isLoading={isLoading} width={120} height={120} />
         <div className={classes.dialRequestsWrapper}>
            <ul className={classes.header}>
               <li>
                  <ExcelCheckbox
                     type="checkbox"
                     name="selectAll"
                     id="selectAll"
                     handleClick={onSelectAll}
                  />
               </li>
               <li className={classes.deleteIcon} onClick={modalHandler}>
                  <Image src={deleteIcon} width={18} height={18} />
               </li>
               <li>№</li>
               <li>Имя</li>
               <li>Фамилия</li>
               <li>Дата</li>
               <li>Номер телефона</li>
               <li>Дата рождения</li>
               <li>Почта</li>
               <li>Область</li>
            </ul>
            {children}
         </div>
      </>
   )
}
