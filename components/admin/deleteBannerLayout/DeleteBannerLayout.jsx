import classes from './DeleteBannerLayout.module.css'
import Button from '../../UI/button/Button'

export default function DeleteBannerLayout({
   onCancelDelete,
   bannerInfo,
   onSubmitHandler,
}) {
   const { bannerName, bannerId } = bannerInfo
   function acceptDeleteHandler(bannerId) {
      onSubmitHandler(bannerId)
   }
   return (
      <div className={classes.deleteBannerLayoutStyles}>
         <div className={classes.logoutHeader}>
            <h1 className={classes.logoutText}>Удалить</h1>
            <p
               className={classes.logoutConfirm}
            >{`Вы действительно хотите удалить ${bannerName}`}</p>
         </div>
         <div className={classes.logoutFooter}>
            <Button
               cancel="отменить"
               onClick={onCancelDelete}
               className={classes.canceleDelete}
            />
            <Button
               submission="удалить"
               className={classes.logoutButton}
               onClick={() => acceptDeleteHandler(bannerId)}
            />
         </div>
      </div>
   )
}
