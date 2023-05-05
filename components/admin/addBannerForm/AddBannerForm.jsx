import { useContext, useState } from 'react'
import { DropZone } from '../../UI/dropZone/DropZone'
import Label from '../../UI/label/Label'
import InputField from '../../UI/inputField/InputField'
import Select from '../../UI/customSelect/Select'
import DateInput from '../../UI/dateInput/DateInput'
import Button from '../../UI/button/Button'
import classes from './AddBannerForm.module.css'
import { handleValidation } from '../../../utils/helpers/helpers'
import { BannerContext } from '../../../store/bannerContext'

const AddBannerForm = ({ onCancelAddBanner, onSubmitHadler }) => {
   const adminCtx = useContext(BannerContext)

   const [bannerImage, setBannerImage] = useState(null)
   const [bannerInfo, setBannerInfo] = useState({
      description: '',
      courseTypeId: '',
      startDate: '',
      endDate: '',
   })
   const [errors, setErrors] = useState({
      description: false,
      courseTypeId: false,
      startDate: false,
      endDate: false,
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
   function submitHandler(e) {
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
      onSubmitHadler({ bannerImage: bannerImage.avatar, ...bannerInfo })
   }

   return (
      <form onSubmit={submitHandler}>
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
            />
            <Label title="Тип курса" />
            <Select
               courses={adminCtx.courses || []}
               defaultValue="Выберите из списка"
               getSelectValue={handleChangeCourseType}
               hasError={errors.courseTypeId}
            />
            <div className={classes.addDateWrapper}>
               <div className={classes.dateContent}>
                  <Label title="От" />
                  <DateInput
                     initState="ДД.ММ.ГГ"
                     name="startDate"
                     getDateValue={handleChangeInput}
                     error={errors.startDate}
                  />
               </div>
               <div>
                  <Label title="До" />
                  <DateInput
                     initState="ДД.ММ.ГГ"
                     name="endDate"
                     getDateValue={handleChangeInput}
                     error={errors.endDate}
                  />
               </div>
            </div>
            <div className={classes.addBannerbtn}>
               <Button
                  cancel="Отменить"
                  className={classes.cancelBannerButton}
                  onClick={onCancelAddBanner}
               />
               <Button
                  submission="Создать"
                  className={classes.addBannerButton}
                  type="submit"
               />
            </div>
         </div>
      </form>
   )
}
export default AddBannerForm
