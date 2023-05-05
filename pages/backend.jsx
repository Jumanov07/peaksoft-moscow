import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { generalActions } from '../store/generalSlice'
import BackComponent from '../components/backComponent/BackComponent'
import Footer from '../components/footer/Footer'
import NavBar from '../components/navBar/NavBar'
import Whatsapp from '../components/whatsapp/Whatsapp'
import MainHeader from '../components/UI/mainHeader/MainHeader'
import { baseFetch } from '../api/baseFetch'
import backend from '../public/icons/backend.svg'
import Requirements from '../components/requirements/Requirements'

const backendData = {
   title: 'Peaksoft House курсы по Back-end',
   introduction:
      'Данный курс предназначен для изучения языка программирования с нуля и направлен на то, чтобы помочь начинающим студентам освоить язык программирования.',
   url: backend,
}

export default function BackEnd({ courses, banners }) {
   const dispath = useDispatch()
   useEffect(() => {
      dispath(generalActions.getCourses(courses))
      dispath(generalActions.getBanners(banners))
      // dispath(generalActions.getConsultation(consultation))
   }, [courses, banners])
   return (
      <div id="backend">
         <Head>
            <title>Backend Page</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1.0, user-scalable=yes"
            />
         </Head>
         <main>
            <div id="modal" />
            <NavBar page="false" />
            <MainHeader
               title={backendData.title}
               introduction={backendData.introduction}
               url={backendData.url}
               courseName="Back-End"
            />
            <BackComponent />
            <Requirements />
            <Footer />
            <Whatsapp />
         </main>
      </div>
   )
}
export async function getServerSideProps() {
   const getStaticData = {
      banners: [],
      error: null,
      courses: [],
      // consultation: [],
   }
   try {
      const bannersResonse = await baseFetch({
         method: 'GET',
         path: 'banners/office/2',
      })
      const courseTypeResponse = await baseFetch({
         method: 'GET',
         path: 'offices/2/course-types',
      })
      // const consultationType = await baseFetch({
      //    method: 'GET',
      //    path: 'courseTypes?getCourseType=CONSULTATION',
      // })
      getStaticData.courses = await courseTypeResponse
      getStaticData.banners = await bannersResonse
      // getStaticData.consultation = await consultationType
   } catch (error) {
      getStaticData.error = error.message
   }
   return {
      props: getStaticData,
   }
}
