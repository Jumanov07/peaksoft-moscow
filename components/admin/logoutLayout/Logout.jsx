import Button from '../../UI/button/Button'
import classes from './Logout.module.css'

export default function Logout({ canselLogout, onLogoutHandler }) {
   return (
      <div className={classes.logoutWrapper}>
         <div className={classes.logoutHeader}>
            <h1 className={classes.logoutText}>Выйти</h1>
            <p className={classes.logoutConfirm}>
               Вы действительно хотите выйти?
            </p>
         </div>
         <div className={classes.logoutFooter}>
            <Button cancel="Отменить" onClick={canselLogout} />
            <Button
               submission="выйти"
               className={classes.logoutButton}
               onClick={onLogoutHandler}
            />
         </div>
      </div>
   )
}
