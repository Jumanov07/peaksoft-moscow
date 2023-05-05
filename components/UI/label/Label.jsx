import React from 'react'
import classes from './Label.module.css'

function Label(props) {
   const { title, isRequired, ...rest } = props
   return (
      <label className={classes.globalLabelStyles} {...rest}>
         {title}
         {isRequired && <span className={classes.required}>*</span>}
      </label>
   )
}

export default Label
