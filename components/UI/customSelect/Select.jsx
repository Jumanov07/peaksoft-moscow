import { useState, useCallback } from 'react'
import classes from './Select.module.css'

function Select(props) {
   const { defaultValue, courses, getSelectValue, value } = props
   const [optionSettings, setOptionSettings] = useState({
      selectedValue: '',
      isActive: false,
   })

   const onChangeOptionSelect = (curse) => {
      setOptionSettings({
         ...optionSettings,
         selectedValue: curse.courseType,
         isActive: !optionSettings.isActive,
      })
      getSelectValue(curse.id)
   }

   const toogleChangeHandler = () => {
      setOptionSettings({
         ...optionSettings,
         isActive: !optionSettings.isActive,
      })
   }
   const courseList = courses.map((item) => (
      <li
         onClick={() => onChangeOptionSelect(item)}
         className={classes.listItem}
         value={item.courseType}
         id={item.id}
         key={item.id}
      >
         {item.courseType}
      </li>
   ))

   const getSelectClassName = useCallback(() => {
      let configuredClassNames
      if (optionSettings.isActive) {
         configuredClassNames = classes.dropDownSelectStyles
      } else {
         configuredClassNames = classes.dropDownHeader
      }
      if (optionSettings.selectedValue || value) {
         configuredClassNames = classes.checkedDownHeader
      }

      if (props.hasError) {
         configuredClassNames = classes.dropDownHasErrorStyles
      }

      return configuredClassNames
   }, [props, optionSettings])

   const renderOptionsContent = () =>
      optionSettings.isActive && (
         <>
            <div className={classes.backdrop} onClick={toogleChangeHandler} />
            <div className={classes.dropDownListContainer}>
               <ul className={classes.dropDownList}>{courseList}</ul>
            </div>
         </>
      )

   const initalOptionValue =
      optionSettings.selectedValue || value || defaultValue

   return (
      <>
         <div className={classes.main}>
            <div className={classes.dropDownContainer}>
               <div
                  onClick={toogleChangeHandler}
                  className={getSelectClassName()}
               >
                  {initalOptionValue}
               </div>
               {renderOptionsContent()}
            </div>
         </div>
         <p className={classes.error}>{props.hasError}</p>
      </>
   )
}

export default Select
