import { forwardRef } from 'react'
import classes from './InputField.module.css'

const InputField = forwardRef((props, ref) => {
   const { type, error, onBlur, ...rest } = props
   const hasErrorStyles = error ? classes.errorStyle : classes.globalCssOfInput
   return (
      <>
         <input
            className={hasErrorStyles}
            ref={ref}
            type={type}
            {...rest}
            onBlur={onBlur}
            autoComplete="off"
         />
         <p className={classes.error}>{error}</p>
      </>
   )
})

export default InputField
