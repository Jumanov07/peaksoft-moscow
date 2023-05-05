import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { toast } from 'react-toastify'
import classes from './banners.module.css'
import Button from '../../components/UI/button/Button'
import Admin from '../admin'
import BannerListHeader from '../../components/UI/bannerList/BannerListHeader'
import BannerList from '../../components/admin/bannersList/BannerList'
import AddBannerForm from '../../components/admin/addBannerForm/AddBannerForm'
import { Modal } from '../../components/UI/modal/modalWindow/Modal'
import { baseFetch } from '../../api/baseFetch'
import SpinnerLoading from '../../components/UI/loadingSpinner/LoadingSpinner'
import { sendWithFormDataToApi } from '../../api/sendWithFormDataToApi'
import { BannerContext } from '../../store/bannerContext'

export default function index({ children, courseType, banners }) {
   useEffect(() => {
      adminCtx.getBanners(banners || [])
      adminCtx.getCourses(courseType || [])
   }, [banners, courseType])
   const adminCtx = useContext(BannerContext)

   const [isModal, setIsModal] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   const modalHandler = () => setIsModal((prevState) => !prevState)

   async function sumbitHadler(newBanner) {
      const { bannerImage, description, courseTypeId, startDate, endDate } =
         newBanner
      try {
         setIsLoading(true)
         const getImageId = await sendWithFormDataToApi({ file: bannerImage })
         if (getImageId.imageId) {
            const newBannerOptions = {
               method: 'POST',
               body: {
                  description,
                  courseTypeId,
                  startDate,
                  endDate,
                  imageId: getImageId.imageId,
               },
               path: 'banners/save/registration-banner',
            }
            const response = await baseFetch(newBannerOptions)
            getBanners()
            toast.success(`${response.description} успешно добавлен!`)
         }
         setIsLoading(false)
         modalHandler()
      } catch (error) {
         setIsLoading(false)
         toast.error(`${error.message}`)
      }
   }

   async function getBanners() {
      try {
         const bannersResonse = await baseFetch({
            method: 'GET',
            path: 'banners/find/registration-banners',
         })
         const responseAnswer = await bannersResonse
         adminCtx.getBanners(responseAnswer)
      } catch (error) {
         toast.error(error.message)
      }
   }
   return (
      <div>
         <Head>
            <title>Peaksoft House</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1.0, user-scalable=yes"
            />
         </Head>
         <main>
            <div id="modal" />
            <div className={classes.bannersContainer}>
               <SpinnerLoading isLoading={isLoading} width={120} height={120} />
               <Modal onCloseBackDrop={modalHandler} isOpen={isModal}>
                  <AddBannerForm
                     onCancelAddBanner={modalHandler}
                     onSubmitHadler={sumbitHadler}
                  />
               </Modal>
               <div className={classes.bannerHeaderStyles}>
                  <h3 className={classes.textBanner}>Баннер</h3>
                  {children}
                  <Button submission="Создать баннер" onClick={modalHandler} />
               </div>
               <div>
                  <ul className={classes.bannerNavigator}>
                     <li className={classes.activeLink}>
                        <Link href="/banners">Баннер</Link>
                     </li>
                     <li className={classes.notActiveLink}>
                        <Link href="/infoBanners">Инфо-баннер</Link>
                     </li>
                  </ul>
               </div>
               <div className={classes.bannerList}>
                  <BannerListHeader />
                  {banners && <BannerList banners={adminCtx.banners} />}
               </div>
            </div>
         </main>
      </div>
   )
}

index.getLayout = function getLayout(page) {
   return <Admin>{page}</Admin>
}
export async function getServerSideProps() {
   const getStaticData = {
      courseType: null,
      banners: null,
      error: null,
   }
   try {
      const courseTypeResponse = await baseFetch({
         method: 'GET',
         path: 'courseTypes?getCourseType=CREATE_BANNER',
      })
      const bannersResonse = await baseFetch({
         method: 'GET',
         path: 'banners/find/registration-banners',
      })
      getStaticData.courseType = await courseTypeResponse
      getStaticData.banners = await bannersResonse
   } catch (error) {
      getStaticData.error = error.message
   }
   return {
      props: getStaticData,
   }
}
