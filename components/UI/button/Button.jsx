import { useCallback } from 'react'
import classes from './Button.module.css'

function Button(props) {
   const { submission, cancel, hasError, className, ...rest } = props
   const title = submission || cancel

   const getSelectClassName = useCallback(() => {
      let configuredClassNames
      if (submission) {
         configuredClassNames = classes.sumbissionButtonStyles
      } else {
         configuredClassNames = classes.cancelButtonStyles
      }
      return configuredClassNames
   }, [submission, cancel])
   return (
      <button
         {...rest}
         className={`${className}  ${getSelectClassName()}`}
         disabled={hasError}
      >
         {title}
      </button>
   )
}
export default Button
