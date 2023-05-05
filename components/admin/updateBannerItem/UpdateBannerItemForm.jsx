import React, { useContext, useState } from 'react'
import classes from './UpdateBannerItemForm.module.css'
import { DropZone } from '../../UI/dropZone/DropZone'
import Label from '../../UI/label/Label'
import InputField from '../../UI/inputField/InputField'
import DateInput from '../../UI/dateInput/DateInput'
import Button from '../../UI/button/Button'
import Select from '../../UI/customSelect/Select'
import { BannerContext } from '../../../store/bannerContext'
import { handleValidation } from '../../../utils/helpers/helpers'

const UpdateBannerItemForm = ({
   onCancelDelete,
   onSubmitHandler,
   banner,
   courseTypeId,
}) => {
   const destructuring = courseTypeId[0] || null

   const { bannerName, courseName, imageLink, createdDate, finishedDate } =
      banner
   const adminCtx = useContext(BannerContext)
   const [bannerInfo, setBannerInfo] = useState({
      courseTypeId: destructuring?.id,
      startDate: createdDate,
      endDate: finishedDate,
      description: bannerName,
   })
   const [errors, setErrors] = useState({
      description: false,
      courseTypeId: false,
      startDate: false,
      endDate: false,
   })
   const [bannerImage, setBannerImage] = useState({
      avatar: imageLink,
      preview: imageLink,
   })

   const handleChangeCourseType = (courseId) => {
      setBannerInfo((prevState) => ({
         ...prevState,
         courseTypeId: courseId,
      }))
   }

   const handleChangeInput = ({ target: { name, value } }) => {
      setBannerInfo({ ...bannerInfo, [name]: value })
   }
   const sumbitHandler = (e) => {
      e.preventDefault()
      const isHasError = handleValidation(bannerInfo)
      if (Object.values(isHasError).length > 0) {
         setErrors(isHasError)
         return
      }
      if (!bannerImage) {
         setErrors((prevState) => ({
            ...prevState,
            imageId: 'сиз сүрөт жүктөөнү унутуп калдыңыз',
         }))
         return
      }
      onSubmitHandler({ bannerImage: bannerImage.avatar, ...bannerInfo })
   }

   return (
      <form onSubmit={sumbitHandler}>
         <div className={classes.addBookFormContent}>
            <h1 className={classes.addBunnerTitle}>Регистрация</h1>
            <DropZone
               avatar={bannerImage}
               setAvatar={setBannerImage}
               error={errors.imageId}
            />
            <Label title="Напишите описание" />
            <InputField
               placeholder="Напишите описание"
               name="description"
               onChange={handleChangeInput}
               error={errors.description}
               value={bannerInfo.description}
            />
            <Label title="Тип курса" />
            <Select
               courses={adminCtx.courses || []}
               value={courseName}
               getSelectValue={handleChangeCourseType}
               hasError={errors.courseTypeId}
            />
            <div className={classes.addDateWrapper}>
               <div className={classes.dateContent}>
                  <Label title="От" />
                  <DateInput
                     value={bannerInfo.startDate}
                     initState={bannerInfo.startDate}
                     name="startDate"
                     getDateValue={handleChangeInput}
                     error={errors.startDate}
                  />
               </div>
               <div>
                  <Label title="До" />
                  <DateInput
                     value={bannerInfo.endDate}
                     initState={bannerInfo.endDate}
                     name="endDate"
                     getDateValue={handleChangeInput}
                     error={errors.endDate}
                  />
               </div>
            </div>
            <div className={classes.addBannerbtn}>
               <Button
                  cancel="Отменить"
                  className={classes.addBannerButton}
                  onClick={onCancelDelete}
               />
               <Button
                  submission="Обновить"
                  className={classes.addBannerButton}
                  type="submit"
               />
            </div>
         </div>
      </form>
   )
}

export default UpdateBannerItemForm
