import { forwardRef, useState, useCallback } from 'react'
import classes from './DateInput.module.css'

const DateInput = forwardRef((props, ref) => {
   const { initState, error, getDateValue, ...rest } = props
   const [valueOfDatePicker, setValueOfDatePicker] = useState(initState)

   const reversedDate =
      valueOfDatePicker && valueOfDatePicker.split('-').reverse().join('.')

   const getInputClassName = useCallback(() => {
      const hasErrorStyles = error
         ? classes.errorStyle
         : classes.containerOfDateInput
      return hasErrorStyles
   }, [error])
   const [dateErrorMessage, setDateErrorMessage] = useState('')

   function validDate() {
      if (initState.includes('кк.аа.жжжж')) return
      const inputDate = new Date(document.getElementById('inputDate').value)
         .toISOString()
         .slice(0, 10)
      const currentDate = new Date().toISOString().slice(0, 10)
      const res = inputDate < currentDate
      if (res) {
         setDateErrorMessage('Введите правильный формат даты')
         return
      }
      setDateErrorMessage('')
   }

   const dateInputChangeHandler = (e) => {
      setValueOfDatePicker(e.target.value)
      getDateValue(e)
   }
   const getInputTextClassName = () => {
      const inputTextClassName = valueOfDatePicker.includes('.')
         ? `${classes.text}`
         : `${classes.blackTextColor}`

      return inputTextClassName
   }
   return (
      <>
         <div className={getInputClassName()}>
            <input
               id="inputDate"
               onChange={dateInputChangeHandler}
               className={classes.input}
               type="date"
               ref={ref}
               {...rest}
               name={rest.name}
               onBlur={validDate}
            />
            <span className={getInputTextClassName()}>{reversedDate}</span>
            <span className={classes.icon} />
         </div>
         <p className={classes.error}>{dateErrorMessage || error}</p>
      </>
   )
})

export default DateInput
