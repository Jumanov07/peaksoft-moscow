import Paragraph from '../../UI/paragraph/Paragraph'
import { InfoBannersItem } from '../infoBannersItem/InfoBannersItem'

const InfoBannersList = ({ infoBanners }) => (
   <div>
      {infoBanners.length !== 0 ? (
         infoBanners.map((item, index) => {
            return (
               <InfoBannersItem
                  key={item.bannerId}
                  data={item}
                  counter={index}
               />
            )
         })
      ) : (
         <Paragraph>Нет доступных баннеров...</Paragraph>
      )}
   </div>
)
export default InfoBannersList
