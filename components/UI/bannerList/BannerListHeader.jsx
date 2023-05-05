import classes from './BannerListHeader.module.css'

const BannerListHeader = () => {
   return (
      <div className={classes.onlyForBorderStyles}>
         <ul className={classes.header}>
            <li>№</li>
            <li>Название</li>
            <li>Курс</li>
            <li>Дата создания</li>
            <li>Дата окончания</li>
            <li className={classes.actionControl}>Действия</li>
         </ul>
      </div>
   )
}

export default BannerListHeader
