import { useState } from 'react'
import classes from './AddInfoBannerForm.module.css'
import { DropZone } from '../../UI/dropZone/DropZone'
import Label from '../../UI/label/Label'
import InputField from '../../UI/inputField/InputField'
import Select from '../../UI/customSelect/Select'
import Button from '../../UI/button/Button'
import { handleValidation } from '../../../utils/helpers/helpers'

export default function AddInfoBannerForm({
   onCancelAddInfoBanner,
   courseType,
   onSubmitHandler,
}) {
   const [image, setImage] = useState(null)
   const [bannerInfo, setBannerInfo] = useState({
      description: '',
      courseTypeId: '',
   })
   const [errors, setErrors] = useState({
      description: false,
      courseTypeId: false,
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

   async function submitHandler(e) {
      e.preventDefault()
      const isHasError = handleValidation(bannerInfo)
      if (Object.values(isHasError).length > 0) {
         setErrors(isHasError)
         return
      }
      if (!image) {
         setErrors((prevState) => ({
            ...prevState,
            imageId: 'сиз сүрөт жүктөөнү унутуп калдыңыз',
         }))
         return
      }
      onSubmitHandler({ bannerImage: image.avatar, ...bannerInfo })
   }

   return (
      <form
         onSubmit={submitHandler}
         className={classes.addBannerInfoFormWrapper}
      >
         <h1 className={classes.addBunnerTitle}>Инфо-баннер</h1>
         <div className={classes.addBannerInfoContent}>
            <DropZone
               avatar={image}
               setAvatar={setImage}
               error={errors.imageId}
            />
            <Label title="Напишите описание" />
            <InputField
               placeholder="Напишите описание"
               name="description"
               error={errors.description}
               onChange={handleChangeInput}
            />
            <Label title="Тип курса" />
            <Select
               courses={courseType || []}
               defaultValue="Выберите из списка"
               getSelectValue={handleChangeCourseType}
               hasError={errors.courseTypeId}
            />
         </div>
         <div className={classes.addBannerbtn}>
            <Button
               cancel="Отменить"
               className={classes.addBannerButton}
               onClick={onCancelAddInfoBanner}
            />
            <Button
               submission="Создать"
               className={classes.addBannerButton}
               type="submit"
            />
         </div>
      </form>
   )
}
