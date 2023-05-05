import { useSelector } from 'react-redux'
import { useState } from 'react'
import IconX from '../../UI/iconX/IconX'
import classes from './ApplicationForm.module.css'
import Label from '../../UI/label/Label'
import InputField from '../../UI/inputField/InputField'
import DateInput from '../../UI/dateInput/DateInput'
import Select from '../../UI/customSelect/Select'
import Textarea from '../../UI/textarea/Textarea'
import RadioButton from '../../UI/radioButton/RadioButton'
import Button from '../../UI/button/Button'
import { handleValidation } from '../../../utils/helpers/helpers'

export default function ApplicationForm({
   onClose,
   cancelSelect,
   submitHandler,
   cancelTextArea,
   cancelCheckbox,
}) {
   const { courses } = useSelector((state) => state.general)
   const [data, setData] = useState({
      name: '',
      surname: '',
      email: '',
      phone: '',
      birthDate: '',
      online: false,
      offline: false,
      direction: 'null',
      desciption: '',
      additionalPhone: '',
   })

   const [errors, setErrors] = useState({
      name: false,
      surname: false,
      email: false,
      phone: false,
      birthDate: false,
      online: false,
      offline: false,
      direction: false,
   })
   // delete desciption

   const handleChangeInput = ({ target: { name, value } }) => {
      if (name === 'phone') {
         const phoneNumber = value.replace(/[^\d]/g, '')
         setData({ ...data, phone: phoneNumber && `+${phoneNumber}` })
         return
      }
      if (name === 'additionalPhone') {
         const additionalPhone = value.replace(/[^\d]/g, '')
         setData({
            ...data,
            additionalPhone: additionalPhone && `+${additionalPhone}`,
         })
         return
      }
      setData({ ...data, [name]: value })
   }
   const handleChangeRadioButton = ({ target: { checked, id } }) => {
      if (id === 'offline')
         setData({ ...data, offline: checked, online: false })
      else setData({ ...data, online: checked, offline: false })
   }
   const hadleChangeDirectionType = (direction) => {
      setData({ ...data, direction })
   }

   const onSubmit = (e) => {
      e.preventDefault()
      const errors = handleValidation(data)
      if (Object.values(errors).length !== 0) {
         setErrors(errors)
         return
      }
      submitHandler(data)
   }
   return (
      <form className={classes.formWrapper} onSubmit={onSubmit}>
         <div className={classes.formHeader}>
            <h2 className={classes.applicationTitle}>Катталуу</h2>
            <IconX onClick={onClose} className={classes.iconXStyles} />
         </div>
         <div className={classes.userInfoContent}>
            <div className={classes.userDataContent}>
               <Label isRequired title="Атыңыз" htmlFor="name" />
               <InputField
                  type="text"
                  id="name"
                  name="name"
                  value={data.name}
                  placeholder="Атыңыз"
                  onChange={handleChangeInput}
                  error={errors.name}
               />
               <Label isRequired title="Фамилияңыз" htmlFor="surname" />
               <InputField
                  type="text"
                  id="surname"
                  name="surname"
                  placeholder="Фамилияңыз"
                  value={data.surname}
                  onChange={handleChangeInput}
                  error={errors.surname}
               />
               <Label isRequired title="Email" htmlFor="email" />
               <InputField
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                  name="email"
                  value={data.email}
                  onChange={handleChangeInput}
                  error={errors.email}
               />
               <Label
                  isRequired
                  title="Туулган күнү, айы, жылы"
                  htmlFor="birthDate"
               />
               <DateInput
                  initState="кк.аа.жжжж"
                  id="birthDate"
                  name="birthDate"
                  value={data.birthDate}
                  getDateValue={handleChangeInput}
                  error={errors.birthDate}
               />
               {!cancelSelect && (
                  <>
                     <Label title="Кайсыл курста окугуңуз келет" isRequired />
                     <Select
                        defaultValue="Тизмеден тандаңыз"
                        courses={courses || []}
                        name="direction"
                        hasError={errors.direction}
                        getSelectValue={hadleChangeDirectionType}
                     />
                  </>
               )}
            </div>
            <div className={classes.userBirthdateContent}>
               {/* one component type='date' or type='text' */}
               <Label title="Байланышуу тел" isRequired htmlFor="phone" />
               <InputField
                  type="text"
                  id="phone"
                  placeholder="+___ (___) __ __ __"
                  name="phone"
                  value={data.phone}
                  onChange={handleChangeInput}
                  error={errors.phone}
               />
               <Label title="Кошумча тел.номери" htmlFor="phoneNumber" />
               <InputField
                  type="text"
                  id="phoneNumber"
                  placeholder="+___ (___) __ __ __"
                  name="additionalPhone"
                  value={data.additionalPhone}
                  onChange={handleChangeInput}
               />

               {!cancelCheckbox && (
                  <>
                     <Label
                        title="Кандай форматта окуйсуз?"
                        htmlFor="checkbox"
                        isRequired
                     />
                     <div className={classes.radioButtonContainer}>
                        <RadioButton
                           type="radio"
                           title="Онлайн"
                           id="online"
                           name="offline"
                           value={data.online}
                           onChange={handleChangeRadioButton}
                        />
                        <RadioButton
                           type="radio"
                           title="Офлайн"
                           id="offline"
                           name="offline"
                           value={data.offline}
                           onChange={handleChangeRadioButton}
                        />
                     </div>
                  </>
               )}
            </div>
         </div>
         {!cancelTextArea && (
            <div className={classes.userSelectSection}>
               <Label title="Эмне себептен биздин курста окугуңуз келет?" />
               <Textarea
                  placeholder="50 - дөн кем эмес сөз жазыныз"
                  name="desciption"
                  onChange={handleChangeInput}
               />
            </div>
         )}
         <div className={classes.usersSubmitSection}>
            <Button
               cancel="Отменить"
               onClick={onClose}
               className={classes.buttonStyles}
            />
            <Button submission="Тапшыруу" type="submit" />
         </div>
      </form>
   )
}
