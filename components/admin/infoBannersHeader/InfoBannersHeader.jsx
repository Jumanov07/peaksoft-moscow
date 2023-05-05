import classes from './InfoBannersHeader.module.css'

export default function InfoBannersHeader() {
   return (
      <div>
         <div className={classes.infoBannerHeaderStyles}>
            <p>№</p>
            <p>Название</p>
            <p>Курс</p>
            <p>Действия</p>
         </div>
      </div>
   )
}
