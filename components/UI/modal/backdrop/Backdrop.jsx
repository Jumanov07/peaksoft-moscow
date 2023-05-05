import classes from './Backdrop.module.css'

export function Backdrop({ onClose }) {
   return <div className={classes.backdrop} onClick={onClose} />
}
