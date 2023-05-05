import { createPortal } from 'react-dom'
import classes from './Modal.module.css'
import { Backdrop } from '../backdrop/Backdrop'

export function Modal({ isOpen, onCloseBackDrop, children, top, className }) {
   return isOpen ? (
      <>
         {createPortal(
            <>
               <Backdrop onClose={onCloseBackDrop} />
               <div className={classes.wrapperOfModal}>
                  <div
                     className={`${classes.modalContent} ${className}`}
                     top={top}
                  >
                     {children}
                  </div>
               </div>
            </>,
            document.querySelector('#modal')
         )}
      </>
   ) : null
}
