import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { toast } from 'react-toastify'
import classes from '../../styles/application.module.css'
import Admin from '../admin'
import Search from '../../components/UI/search/Search'
import UserApplicationHeader from '../../components/admin/userApplicationHeader/UserApplicationHeader'
import UserApplicationList from '../../components/admin/userApplicationList/UserApplicationList'
import { Modal } from '../../components/UI/modal/modalWindow/Modal'
import { baseFetch } from '../../api/baseFetch'
import { BannerContext } from '../../store/bannerContext'
import SpinnerLoading from '../../components/UI/loadingSpinner/LoadingSpinner'
import Button from '../../components/UI/button/Button'
import DeleteBannerLayout from '../../components/admin/deleteBannerLayout/DeleteBannerLayout'

export default function index({ applications }) {
   const adminCtx = useContext(BannerContext)
   const [searchContent, setSearchContent] = useState([])
   const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
      adminCtx.getApplications(applications)
   }, [applications])

   useEffect(() => {
      setSearchContent(adminCtx.applications)
   }, [adminCtx.applications])

   const [isModal, setIsModal] = useState(false)
   const modalHandler = () => setIsModal((prevState) => !prevState)
   const [searchParam] = useState(['name', 'phone', 'courseType'])

   const searchHandler = (value) => {
      const foundedContent = adminCtx.applications.filter((item) => {
         return searchParam.some((newItem) => {
            return (
               item[newItem]
                  .toString()
                  .toLowerCase()
                  .indexOf(value.toLowerCase()) > -1
            )
         })
      })
      setSearchContent(foundedContent)
   }

   const [isCheckAll, setIsCheckAll] = useState(false)

   const selectAllHandle = () => {
      setIsCheckAll((prevState) => !prevState)
      adminCtx.getCheckeds(searchContent.map((item) => item.id))
      if (isCheckAll) {
         adminCtx.getCheckeds([])
      }
   }
   const hadnleClickByOneCheckbox = (e) => {
      const { id, checked } = e.target
      adminCtx.getCheckeds((prevState) => [...prevState, +id])
      if (!checked) {
         const updatedCheckbox = adminCtx.isChecked.filter(
            (item) => item !== +id
         )
         adminCtx.getCheckeds(updatedCheckbox)
      }
   }
   async function exportToExcel() {
      let allSelectedUsersId = null
      if (adminCtx.isChecked.length === 0) {
         allSelectedUsersId = searchContent.map((item) => item.id)
      }
      setIsLoading(true)
      try {
         const responseBody =
            adminCtx.isChecked.length === 0
               ? allSelectedUsersId
               : adminCtx.isChecked
         const response = await fetch(
            'https://peaksoft.house:5000/api/consultations/export-excel',
            {
               method: 'POST',
               body: JSON.stringify({
                  consultationsIds: responseBody,
               }),
               headers: {
                  'Content-type': 'application/json',
               },
            }
         )
         const answer = await response.blob()
         const a = document.createElement('a')
         a.href = window.URL.createObjectURL(answer)
         a.style.display = 'none'
         a.setAttribute('download', 'applications.xlsx')
         document.body.appendChild(a)
         a.click()
         a.href = null
         adminCtx.getCheckeds([])
         setIsCheckAll(false)
         setIsLoading(false)
      } catch (error) {
         toast.error('Ошибка сервера')
         setIsLoading(false)
      }
   }

   async function deleteAllApplication() {
      if (adminCtx.isChecked.length === 0) {
         toast.error('Выберите из списка')
         return
      }
      setIsLoading(true)
      try {
         const requestOptions = {
            method: 'DELETE',
            path: 'consultations/delete-consultations',
            body: { consultationsIds: adminCtx.isChecked },
         }
         const response = await baseFetch(requestOptions)
         if (response.status === 'OK') {
            getApplications()
            setIsCheckAll(false)
            adminCtx.getCheckeds([])
            toast.success(response.message)
         }
         modalHandler()
         setIsLoading(false)
      } catch (error) {
         modalHandler()
         setIsLoading(false)
         toast.error(error.message)
      }
   }

   async function getApplications() {
      try {
         const applicationResponse = await baseFetch({
            method: 'GET',
            path: 'consultations',
         })
         if (applicationResponse) {
            adminCtx.getApplications(applicationResponse)
         }
      } catch (error) {
         toast.error('Не удалось загрузить заявки' || error)
      }
   }

   return (
      <div>
         <Head>
            <title>Peaksoft</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Modal isOpen={isModal} onCloseBackDrop={modalHandler}>
            <DeleteBannerLayout
               onCancelDelete={modalHandler}
               onSubmitHandler={deleteAllApplication}
               bannerInfo={{ bannerName: 'выделенные заявки', bannerId: 0 }}
            />
         </Modal>
         <SpinnerLoading isLoading={isLoading} width={120} height={120} />
         <div>
            <div className={classes.bannerHeaderStyles}>
               <h3 className={classes.textBanner}>Заявки</h3>
               <Button submission="Export to excel" onClick={exportToExcel} />
            </div>

            <div className={classes.searchComponentPosition}>
               <Search findToStudentHandler={searchHandler} />
            </div>
            <div className={classes.bannerList}>
               <UserApplicationHeader
                  select={isCheckAll}
                  onSelecAll={selectAllHandle}
                  onDeleteApplications={modalHandler}
               />
               <UserApplicationList
                  applications={searchContent}
                  onChangeCheckbox={hadnleClickByOneCheckbox}
               />
            </div>
         </div>
      </div>
   )
}

index.getLayout = function getLayout(page) {
   return <Admin>{page}</Admin>
}
export async function getServerSideProps() {
   const getStaticData = {
      applications: [],
   }
   try {
      const applicationResponse = await baseFetch({
         method: 'GET',
         path: 'consultations',
      })

      getStaticData.applications = await applicationResponse
   } catch (error) {
      getStaticData.applications = error
   }
   return {
      props: getStaticData,
   }
}
