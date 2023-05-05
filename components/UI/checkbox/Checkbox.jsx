import { useState } from 'react'
import styles from './Checkbox.module.css'

const Checkbox = ({ onCheckedRequestHandler, id, checked, name }) => {
   const [isChecked, setIsChecked] = useState(!!checked)
   const onCheckedHandler = () => {
      onCheckedRequestHandler({ id, checked: !isChecked })
      setIsChecked((isChecked) => !isChecked)
   }
   return (
      <input
         onChange={onCheckedHandler}
         className={styles.checkbox}
         checked={isChecked}
         type="checkbox"
         name={name}
      />
   )
}

export default Checkbox
