import { useSelector } from 'react-redux'
import { useState } from 'react'
import classes from './InformationForm.module.css'
import IconX from '../../UI/iconX/IconX'
import Label from '../../UI/label/Label'
import Button from '../../UI/button/Button'
import InputField from '../../UI/inputField/InputField'
import { handleValidation } from '../../../utils/helpers/helpers'
import NewSelect from '../../UI/newSelect/NewSelect'

export default function InformationForm({
   onClose,
   cancelButton,
   className,
   onSubmitHadnler,
}) {
   const { courses } = useSelector((state) => state.general)
   const [data, setData] = useState({
      name: '',
      phone: '',
      courseTypeId: null,
   })
   const [errors, setErrors] = useState({
      name: false,
      phone: false,
      courseTypeId: false,
   })

   const handleChangeInput = ({ target: { name, value } }) => {
      if (name === 'phone') {
         const phoneNumber = value.replace(/[^\d]/g, '')
         setData({ ...data, phone: phoneNumber && `+${phoneNumber}` })
         return
      }
      setData({ ...data, [name]: value })
   }
   const onSubmit = (e) => {
      e.preventDefault()
      const errors = handleValidation(data)
      if (Object.values(errors).length !== 0) {
         setErrors(errors)
         return
      }
      setErrors({ name: false, phone: false, courseTypeId: false })
      const newCosultation = {
         name: data.name,
         phoneNumber: data.phone,
         courseType: data.courseTypeId.id,
      }
      onSubmitHadnler(newCosultation)
      setData({ name: '', phone: '', courseTypeId: null })
   }

   function onSelectChanges(data) {
      setData((prevState) => ({ ...prevState, courseTypeId: data }))
   }

   return (
      <form className={`${classes.informationWrapper}`} onSubmit={onSubmit}>
         <div className={classes.formHeader}>
            <h2 className={classes.applicationTitle}>Получить информацию</h2>
            {cancelButton || (
               <IconX onClick={onClose} className={classes.iconXStyles} />
            )}
         </div>
         <div className={classes.userSelectSection}>
            <Label isRequired title="Имя" htmlFor="name" />
            <InputField
               type="text"
               id="name"
               name="name"
               placeholder="Ваше имя"
               error={errors.name}
               value={data.name}
               onChange={handleChangeInput}
            />
            <Label isRequired title="Номер телефона" htmlFor="phoneNumber" />
            <InputField
               type="text"
               id="phoneNumber"
               placeholder="+___ (___) __ __ __"
               name="phone"
               error={errors.phone}
               value={data.phone}
               onChange={handleChangeInput}
            />
            <Label
               title="Выберите курс в котором вы хотели обучаться?"
               isRequired
            />
            <NewSelect
               options={[courses[0]]}
               getOptionLabel={(option) => option.name}
               getOptionValue={(option) => option.id}
               onSelectChange={onSelectChanges}
               error={errors.courseTypeId}
               placeholder="Выберите из списка"
            />
         </div>
         <div className={classes.usersSubmitSection}>
            {cancelButton || (
               <Button
                  cancel="Отмена"
                  className={classes.btnClass}
                  onClick={onClose}
               />
            )}
            <Button
               className={`${className}`}
               submission="Отправить"
               type="submit"
            />
         </div>
      </form>
   )
}
