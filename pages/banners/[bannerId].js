import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Admin from '../admin'
import Button from '../../components/UI/button/Button'
import classes from './bannerId.module.css'
import Search from '../../components/UI/search/Search'
import DialRequests from '../../components/admin/dialRequests/DialRequests'
import BannersUsersList from '../../components/admin/bannerUsersList/BannersUsersList'
import { BannerContext } from '../../store/bannerContext'
import { baseFetch } from '../../api/baseFetch'
import SpinnerLoading from '../../components/UI/loadingSpinner/LoadingSpinner'

export default function bannerId({ data }) {
   const { bannersStudents, error } = data
   const adminCtx = useContext(BannerContext)
   const [searchContent, setSearchContent] = useState([])
   const [isLoading, setIsLoading] = useState(false)
   const { query } = useRouter()

   useEffect(() => {
      setSearchContent(adminCtx.bannersStudents)
   }, [adminCtx.bannersStudents])

   useEffect(() => {
      adminCtx.getBannersStudents(bannersStudents)
   }, [bannersStudents])
   const PATHS = [
      { link: '/banners', name: 'Баннер' },
      { link: `/banners/${query.bannerId}`, name: `${query.bannerName}` },
   ]

   const [isCheckAll, setIsCheckAll] = useState(false)
   const [searchParams] = useState([
      'courseType',
      'email',
      'dateOfBirth',
      'email',
      'name',
      'phone',
      'surname',
   ])

   const searchHadnler = (value) => {
      const foundedContent = adminCtx.bannersStudents.filter((item) => {
         return searchParams.some((newItem) => {
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

   const selectAllHandle = () => {
      setIsCheckAll((prevState) => !prevState)
      adminCtx.getCheckedStudents(
         adminCtx.bannersStudents.map((item) => item.id)
      )
      if (isCheckAll) {
         adminCtx.getCheckedStudents([])
      }
   }

   const hadnleClickByOneCheckbox = (e) => {
      const { id, checked } = e.target
      adminCtx.getCheckedStudents((prevState) => [...prevState, +id])
      if (!checked) {
         const updatedCheckbox = adminCtx.checkedStudent.filter(
            (item) => item !== +id
         )
         adminCtx.getCheckedStudents(updatedCheckbox)
      }
   }
   async function exportToExcel() {
      let allSelectedUsersId = null
      if (adminCtx.checkedStudent.length === 0) {
         allSelectedUsersId = searchContent.map((item) => item.id)
      }
      setIsLoading(true)
      try {
         const responseBody =
            adminCtx.checkedStudent.length === 0
               ? allSelectedUsersId
               : adminCtx.checkedStudent
         const response = await fetch(
            'https://peaksoft.house:5000/api/students/get-excel-file',
            {
               method: 'POST',
               body: JSON.stringify({ studentsId: responseBody }),
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
         adminCtx.getCheckedStudents([])
         setIsCheckAll(false)
         setIsLoading(false)
      } catch (error) {
         setIsLoading(false)
      }
   }

   return (
      <div>
         <Head>
            <title>Banner</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1.0, user-scalable=yes"
            />
         </Head>
         <main>
            <div id="modal" />
            <section className={classes.sectionWrapper}>
               <SpinnerLoading isLoading={isLoading} width={120} height={120} />
               <div className={classes.bannerIfnoContent}>
                  <div className={classes.breadCrumbsStyles}>
                     <p>
                        {PATHS.map((path, i) => (
                           <span
                              key={path.link}
                              className={classes.pathNameStyles}
                           >
                              <Link href={path.link}>{`${i ? '/' : ''}${
                                 path.name
                              }`}</Link>
                           </span>
                        ))}
                     </p>
                     <h1 className={classes.bannerName}>{query.bannerName}</h1>
                  </div>
                  <Button
                     submission="export to exсel"
                     onClick={exportToExcel}
                  />
               </div>
               <div className={classes.searchContent}>
                  <Search findToStudentHandler={searchHadnler} />
               </div>
               <DialRequests onSelectAll={selectAllHandle}>
                  {error || (
                     <BannersUsersList
                        users={searchContent}
                        onChangeCheckbox={hadnleClickByOneCheckbox}
                     />
                  )}
               </DialRequests>
            </section>
         </main>
      </div>
   )
}

bannerId.getLayout = function getLayout(page) {
   return <Admin>{page}</Admin>
}

export async function getServerSideProps(ctx) {
   const getStaticData = {
      bannersStudents: null,
      error: null,
   }
   try {
      const response = await baseFetch({
         method: 'GET',
         path: `students/${ctx.query.bannerId}`,
      })
      getStaticData.bannersStudents = await response
   } catch (error) {
      getStaticData.error = error.message
   }

   return {
      props: { data: getStaticData },
   }
}