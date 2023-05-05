import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Admin from './admin'
import classes from '../styles/infoBanners.module.css'
import Button from '../components/UI/button/Button'
import InfoBannersHeader from '../components/admin/infoBannersHeader/InfoBannersHeader'
import InfoBannersList from '../components/admin/infoBannersList/InfoBannersList'
import { Modal } from '../components/UI/modal/modalWindow/Modal'
import AddInfoBannerForm from '../components/admin/addInfoBannerForm/AddInfoBannerForm'
import { baseFetch } from '../api/baseFetch'
import { BannerContext } from '../store/bannerContext'
import { sendWithFormDataToApi } from '../api/sendWithFormDataToApi'
import SpinnerLoading from '../components/UI/loadingSpinner/LoadingSpinner'

export default function InfoBanners({ children, bannerData }) {
   const [isModal, setIsModal] = useState(false)
   const [isLoading, setIsLoading] = useState(false)
   const adminCtx = useContext(BannerContext)

   useEffect(() => {
      adminCtx.getCourses(bannerData.courses || [])
      adminCtx.getInfoBanners(bannerData.infoBanners || [])
   }, [bannerData.courseType, bannerData.courses])

   const modalHandler = () => setIsModal((prevState) => !prevState)

   async function addNewInfoBanner({ bannerImage, courseTypeId, description }) {
      try {
         setIsLoading(true)
         const getImageId = await sendWithFormDataToApi({ file: bannerImage })
         if (getImageId.imageId) {
            const response = await baseFetch({
               method: 'POST',
               body: {
                  courseTypeId,
                  description,
                  imageId: getImageId.imageId,
               },
               path: 'banners/save/info-banner',
            })
            if (response.bannerId) {
               toast.success(`${response.bannerName} успешно добавлен!`)
            }
         } else {
            toast.error('Повторите позже')
         }
         getInfoBanners()
         setIsLoading(false)
         modalHandler()
      } catch (error) {
         setIsLoading(false)
         toast.error(`${error.message}`)
      }
   }
   async function getInfoBanners() {
      try {
         const bannersResonse = await baseFetch({
            method: 'GET',
            path: 'banners/find/info-banners',
         })
         if (bannersResonse) {
            adminCtx.getInfoBanners(bannersResonse)
         }
      } catch (error) {
         toast.error(error.message)
      }
   }

   return (
      <div className={classes.bannersContainer}>
         <SpinnerLoading isLoading={isLoading} width={120} height={120} />
         <Modal isOpen={isModal} onCloseBackDrop={modalHandler}>
            <AddInfoBannerForm
               onCancelAddInfoBanner={modalHandler}
               courseType={adminCtx.courses}
               onSubmitHandler={addNewInfoBanner}
            />
         </Modal>
         <div className={classes.bannerHeaderStyles}>
            <h3 className={classes.textBanner}>Баннер</h3>
            {children}
            <Button submission="Создать баннер" onClick={modalHandler} />
         </div>
         <div>
            <div>
               <ul className={classes.bannerNavigator}>
                  <li className={classes.notActiveLink}>
                     <Link href="/banners">Баннер</Link>
                  </li>
                  <li className={classes.activeLink}>
                     <Link href="/infoBanners">Инфо-баннер</Link>
                  </li>
               </ul>
            </div>
         </div>
         <div className={classes.bannerList}>
            <InfoBannersHeader />
            <InfoBannersList infoBanners={adminCtx.infoBanners} />
         </div>
      </div>
   )
}

InfoBanners.getLayout = function getLayout(page) {
   return <Admin>{page}</Admin>
}
export async function getServerSideProps() {
   const banners = {
      infoBanners: [],
      error: null,
      courses: null,
   }
   try {
      const response = await baseFetch({
         method: 'GET',
         path: 'banners/find/info-banners',
      })
      const courseType = await baseFetch({
         method: 'GET',
         path: 'courseTypes?getCourseType=CREATE_BANNER',
      })
      banners.infoBanners = await response
      banners.courses = await courseType
   } catch (error) {
      banners.error = error.message
   }
   return {
      props: {
         bannerData: banners,
      },
   }
}
