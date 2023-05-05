import { forwardRef } from 'react'
import classes from './RadioButton.module.css'

const RadioButton = forwardRef((props, ref) => {
   const { type, id, title, onChange, ...rest } = props
   return (
      <div className={classes.radioButtonContainer}>
         <input
            className={classes.inputTypeRadio}
            type={type}
            id={id}
            ref={ref}
            {...rest}
            onChange={onChange}
         />
         <label className={classes.labelOfTypeRadio} htmlFor={id}>
            {title}
         </label>
      </div>
   )
})

export default RadioButton
