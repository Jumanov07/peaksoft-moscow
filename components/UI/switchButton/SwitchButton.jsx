import { useState } from 'react'
import classes from './SwitchButton.module.css'

const SwitchButton = ({ onSwitchedRequestHandler, id, view }) => {
   const initialSwitch = view ? 'checked' : ''
   const [switched, setSwitched] = useState(initialSwitch)
   const onSwitchHandler = () => {
      setSwitched((switched) => !switched)
      onSwitchedRequestHandler({ id, view: !switched })
   }
   return (
      <div>
         <label className={classes.switch}>
            <input
               className={classes.input}
               onChange={onSwitchHandler}
               checked={switched}
               type="checkbox"
            />
            <span className={classes.slider} />
         </label>
      </div>
   )
}

export default SwitchButton
