import { useContext, useState, useCallback } from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'
import classes from './BannerItems.module.css'
import deleteIcon from '../../../public/adminIcons/deleteIcon.svg'
import arrowIcon from '../../../public/adminIcons/arrow.svg'
import ExcelCheckbox from '../../UI/excelCheckbox/ExcelCheckbox'
import { BannerContext } from '../../../store/bannerContext'
import DeleteBannerLayout from '../deleteBannerLayout/DeleteBannerLayout'
import { Modal } from '../../UI/modal/modalWindow/Modal'
import SpinnerLoading from '../../UI/loadingSpinner/LoadingSpinner'
import { baseFetch } from '../../../api/baseFetch'

const BannerItems = ({
   name,
   surname,
   phoneNumber,
   dateOfBirth,
   email,
   direction,
   format,
   comment,
   index,
   id,
   onChange,
   isAcive,
   toggleHandle,
   registrationDate,
   additionalPhone,
   isDownloaded,
}) => {
   const adminCtx = useContext(BannerContext)
   const [deleteModal, setIsDeleteModal] = useState(false)
   const deleteModalHadler = () => setIsDeleteModal((prevState) => !prevState)
   const [isLoading, setIsLoading] = useState(false)

   async function deleteUser(userId) {
      const responseOptions = {
         method: 'DELETE',
         path: `students/delete/${userId}`,
      }
      setIsLoading(true)
      try {
         const response = await baseFetch(responseOptions)
         if (response.status === 'OK') {
            const updatedApplications = adminCtx.bannersStudents.filter(
               (item) => item.id !== id
            )
            adminCtx.getBannersStudents(updatedApplications)
         }
         setIsLoading(false)
         toast.success(`${response.message}`)
         deleteModalHadler()
         return response
      } catch (error) {
         setIsLoading(false)
         deleteModalHadler()
         toast.error(`${error.message}`)
         return error
      }
   }
   const dateCut = useCallback(() => {
      const cuttedDate = registrationDate.slice(0, 10)
      return cuttedDate.split('-').reverse().join('.')
   }, [registrationDate])

   return (
      <>
         <Modal isOpen={deleteModal} onCloseBackDrop={deleteModalHadler}>
            <DeleteBannerLayout
               bannerInfo={{ bannerName: name, bannerId: id }}
               onCancelDelete={deleteModalHadler}
               onSubmitHandler={deleteUser}
            />
         </Modal>
         <SpinnerLoading isLoading={isLoading} width={120} height={120} />
         <div className={`${classes.listItem}`}>
            <ul
               className={`${classes.listItemInformation} ${
                  isDownloaded && classes.downloadedStyles
               }`}
            >
               <li>
                  <ExcelCheckbox
                     type="checkbox"
                     id={id}
                     handleClick={onChange}
                     isChecked={adminCtx.checkedStudent.includes(id)}
                     name={index}
                     key={index}
                     onClick={() => toggleHandle(index)}
                  />
               </li>
               <li
                  className={isAcive ? classes.arrow : classes.arrowTop}
                  onClick={() => toggleHandle(index)}
               >
                  <Image src={arrowIcon} width={16} height={16} />
               </li>
               <li>{index + 1}</li>
               <li>{name}</li>
               <li>{surname}</li>
               <li>{dateCut()}</li>
               <li>{phoneNumber}</li>
               <li>{dateOfBirth}</li>
               <li>{email}</li>
               <li className={classes.icon} onClick={deleteModalHadler}>
                  {direction} <Image src={deleteIcon} width={18} height={18} />
               </li>
            </ul>

            <div
               className={
                  isAcive
                     ? classes.hiddenInformationIsShow
                     : classes.hiddenInformationIsHidden
               }
            >
               <ul className={classes.typeOfEdu}>
                  <li className={classes.baseFontStyles}>Формат</li>
                  <li className={classes.baseFontStyles}>Доп.номер</li>
                  <li className={classes.baseFontStyles}>Комментарий</li>
               </ul>
               <ul className={classes.typeOfEduInfo}>
                  <li className={classes.baseFontStyles}>{format}</li>
                  <li className={classes.baseFontStyles}>
                     {additionalPhone || 'пусто'}
                  </li>
                  <li className={classes.baseFontStyles}>{comment}</li>
               </ul>
            </div>
         </div>
      </>
   )
}
export default BannerItems
