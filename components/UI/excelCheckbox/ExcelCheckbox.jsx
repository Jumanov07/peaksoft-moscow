import React from 'react'
import classes from './ExcelCheckbox.module.css'

const ExcelCheckbox = ({ id, type, name, handleClick, isChecked }) => {
   return (
      <input
         id={id}
         name={name}
         type={type}
         onChange={handleClick}
         checked={isChecked}
         className={classes.excelCheckboxStyles}
      />
   )
}
export default ExcelCheckbox
