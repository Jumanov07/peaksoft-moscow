import { ToastContainer } from 'react-toastify'
import classes from './Main.module.css'

const Main = ({ children }) => {
   return (
      <div className={classes.wrapper}>
         <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
         <div className={classes.mainContent}>{children}</div>
      </div>
   )
}
export default Main
