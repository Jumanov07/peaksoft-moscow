import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Head from 'next/head'
import Footer from '../components/footer/Footer'
import Questions from '../components/quesions/Questions'
import AboutITCourses from '../components/aboutITCourses/AboutITCourses'
import CourseFeatures from '../components/courseFeatures/CourseFeatures'
import Header from '../components/Header/Header'
import AboutLesson from '../components/aboutLesson/AboutLesson'
import FeedBaks from '../components/feedBacks/FeedBaks'
import AboutUs from '../components/aboutUs/AboutUs'
import Contacts from '../components/contacts/Contacts'
import Whatsapp from '../components/whatsapp/Whatsapp'
import { baseFetch } from '../api/baseFetch'
import { generalActions } from '../store/generalSlice'
import Carousel from '../components/carousel/Carousel'
// import AlumniCompaniLogo from '../components/alumniCompaniLogo/AlumniCompaniLogo'

export default function Home({ courseType, banners }) {
   const description = `PeakSoft House - бул PeakSoft IT компаниясынын онлайн жана офлайн
   окутуу курстары. Биз талап кылынган Back-end (Java) жана Front-end
   (JavaScript),IT адистерин online - offline даярдайбыз. Нольдон баштап
   биринчи жумуш күнүнө чейин.`
   const dispath = useDispatch()
   useEffect(() => {
      dispath(
         generalActions.getServerData({
            courseType,
            banners,
         })
      )
   }, [courseType, banners])
   return (
      <div>
         <Head>
            <meta charSet="utf-8" />
            <meta name="description" content={description} />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1.0, user-scalable=yes"
            />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/favicon.ico" />
            <title>Peaksoft House - Main Page</title>
         </Head>
         <main>
            <div id="modal" />
            <Header />
            <AboutITCourses />
            <CourseFeatures />
            <AboutLesson />
            <AboutUs />
            <Carousel />
            <FeedBaks />
            {/* <AlumniCompaniLogo /> */}
            <Questions />
            <Contacts />
            <Footer />
            <Whatsapp />
         </main>
      </div>
   )
}

export async function getServerSideProps() {
   const getStaticData = {
      courseType: null,
      error: null,
      banners: null,
      // infoBanners: null,
      // courseTypeConsultation: null,
   }
   try {
      const courseTypeResponse = await baseFetch({
         method: 'GET',
         path: 'offices/2/course-types',
      })
      // courseTypes?getCourseType=CONSULTATION
      // const consultationType = await baseFetch({
      //    method: 'GET',
      //    path: 'courseTypes?getCourseType=CONSULTATION',
      // })
      const registrationBanners = await baseFetch({
         method: 'GET',
         path: 'banners/office/2',
      })
      // const infoBanners = await baseFetch({
      //    method: 'GET',
      //    path: 'banners/find/info-banners2?active=true',
      // })
      // getStaticData.courseTypeConsultation = await consultationType
      // getStaticData.infoBanners = await infoBanners
      getStaticData.banners = await registrationBanners
      getStaticData.courseType = await courseTypeResponse
   } catch (error) {
      getStaticData.error = error.message
   }
   return {
      props: getStaticData,
   }
}
