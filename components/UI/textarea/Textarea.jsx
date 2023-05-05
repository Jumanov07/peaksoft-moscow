import { forwardRef } from 'react'
import classes from './Textarea.module.css'

const Textarea = forwardRef((props, ref) => {
   const { placeholder, id, ...rest } = props
   return (
      <textarea
         className={classes.textareaStyles}
         {...rest}
         placeholder={placeholder}
         id={id}
         ref={ref}
      />
   )
})

export default Textarea
