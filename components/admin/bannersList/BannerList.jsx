import Paragraph from '../../UI/paragraph/Paragraph'
import BannerListItem from '../bannerListItem/BannerListItem'
import styles from './BannerList.module.css'

const BannerList = ({ banners }) => {
   return (
      <div className={styles.list}>
         {banners.length !== 0 ? (
            banners.map((item, index) => {
               return (
                  <BannerListItem
                     key={item.bannerId}
                     banner={item}
                     counter={index}
                  />
               )
            })
         ) : (
            <Paragraph>Нет доступных баннеров...</Paragraph>
         )}
      </div>
   )
}

export default BannerList
