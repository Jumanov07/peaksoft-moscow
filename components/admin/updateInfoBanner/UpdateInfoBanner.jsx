import React, { useContext, useState } from 'react'
import { BannerContext } from '../../../store/bannerContext'
import classes from './UpdateInfoBanner.module.css'
import Label from '../../UI/label/Label'
import InputField from '../../UI/inputField/InputField'
import { DropZone } from '../../UI/dropZone/DropZone'
import Select from '../../UI/customSelect/Select'
import Button from '../../UI/button/Button'
import { handleValidation } from '../../../utils/helpers/helpers'

function UpdateInfoBanner({
   submitHandler,
   onCancelDelete,
   banner,
   courseTypeId,
}) {
   const adminCtx = useContext(BannerContext)
   const destructuring = courseTypeId[0] || null

   const [errors, setErrors] = useState({
      description: false,
      courseTypeId: false,
   })
   const [bannerImage, setBannerImage] = useState({
      avatar: banner.imageLink,
      preview: banner.imageLink,
   })
   const [bannerInfo, setBannerInfo] = useState({
      description: banner.bannerName,
      courseTypeId: destructuring?.id,
   })
   const handleChangeInput = ({ target: { name, value } }) => {
      setBannerInfo({ ...bannerInfo, [name]: value })
   }
   const handleChangeCourseType = (courseId) => {
      setBannerInfo((prevState) => ({
         ...prevState,
         courseTypeId: courseId,
      }))
   }
   function onSubmitHandler(e) {
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
      submitHandler({ bannerImage: bannerImage.avatar, ...bannerInfo })
   }

   return (
      <form
         onSubmit={onSubmitHandler}
         className={classes.addBannerInfoFormWrapper}
      >
         <h1 className={classes.addBunnerTitle}>Инфо-баннер</h1>
         <div className={classes.addBannerInfoContent}>
            <DropZone
               avatar={bannerImage}
               setAvatar={setBannerImage}
               error={errors.imageId}
            />
            <Label title="Напишите описание" />
            <InputField
               value={bannerInfo.description}
               placeholder="Напишите описание"
               name="description"
               error={errors.description}
               onChange={handleChangeInput}
            />
            <Label title="Тип курса" />
            <Select
               courses={adminCtx.courses}
               value={banner.courseName}
               getSelectValue={handleChangeCourseType}
               hasError={errors.courseTypeId}
            />
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
      </form>
   )
}
export default UpdateInfoBanner
