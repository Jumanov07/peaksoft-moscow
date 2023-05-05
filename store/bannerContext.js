import React, { useState, createContext, useMemo } from 'react'

export const BannerContext = createContext({
   banners: [],
   infoBanners: [],
   courses: null,
   applications: [],
   isChecked: [],
   checkedStudent: [],
   bannersStudents: [],
   getBannersStudents: () => {},
   getCheckedStudents: () => {},
   getCheckeds: () => {},
   getApplications: () => {},
   getCourseType: () => {},
   getBanners: () => {},
   getInfoBanners: () => {},
})

export const AdminContextProvider = ({ children }) => {
   const [banners, setBanners] = useState([])
   const [infoBanners, setInfoBanners] = useState([])
   const [courseType, setCourseType] = useState([])
   const [applications, setApplications] = useState([])
   const [isCheck, setIsCheck] = useState([])
   const [checkedStudents, setCheckedStudents] = useState([])
   const [allStudents, getAllStudents] = useState([])

   function getStudents(students) {
      getAllStudents(students)
   }
   function getCheckedStudents(checkedStudent) {
      setCheckedStudents(checkedStudent)
   }

   function getCheckedApplications(application) {
      setIsCheck(application)
   }

   function getCourseType(courses) {
      setCourseType(courses)
   }

   function getApplications(application) {
      setApplications(application)
   }

   function getInfoBanners(infoBanners) {
      setInfoBanners(infoBanners)
   }

   function bannersChangeHandler(updatedBanner) {
      setBanners(updatedBanner)
   }
   const bannerData = useMemo(
      () => ({
         banners,
         courses: courseType,
         infoBanners,
         applications,
         isChecked: isCheck,
         checkedStudent: checkedStudents,
         bannersStudents: allStudents,
         getBannersStudents: getStudents,
         getCheckedStudents,
         getCheckeds: getCheckedApplications,
         getApplications,
         getInfoBanners,
         getCourses: getCourseType,
         getBanners: bannersChangeHandler,
      }),
      [
         allStudents,
         banners,
         courseType,
         infoBanners,
         applications,
         isCheck,
         getStudents,
         getCheckedApplications,
         getApplications,
         getInfoBanners,
         getCourseType,
         bannersChangeHandler,
         getCheckedStudents,
      ]
   )
   return (
      <BannerContext.Provider value={bannerData}>
         {children}
      </BannerContext.Provider>
   )
}

export default BannerContext
