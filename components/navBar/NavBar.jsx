import Image from 'next/image'
import Link from 'next/link'
import { Link as ScrollLink } from 'react-scroll'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence } from 'framer-motion'
import styles from './NavBar.module.css'
import timeIcon from '../../public/img/DateAndTimeIcon.svg'
import phoneIcon from '../../public/img/CommunicationIcon.svg'
import burgerMenuWhite from '../../public/img/burgerMenuWhite.svg'
import burgerMenuBlack from '../../public/img/burgerMenuBlack.svg'
import BurgerMenu from '../burgerMenu/BurgerMenu'
import Button from '../UI/button/Button'
import { Modal } from '../UI/modal/modalWindow/Modal'
import InformationForm from '../authorization/informationForm/InformationForm'
import SpinnerLoading from '../UI/loadingSpinner/LoadingSpinner'
import SuccessMessage from '../authorization/success/SuccessMessage'
import { generalActions, sendUserApplitaction } from '../../store/generalSlice'
import peaksoftWhiteText from '../../public/adminIcons/peaksoftIcon.svg'
import whiteLogo from '../../public/adminIcons/whiteLogo.svg'

function NavBar() {
   const {
      isLoading,
      userRequestError,
      succesUserRequest,
      allBanners,
      infoBanners,
   } = useSelector((state) => state.general)

   const banners = [...(allBanners || []), ...(infoBanners || [])] || []

   function getButtonTitle() {
      const isRegistrationBanner = banners.find((item) => 'createdDate' in item)
      return !!isRegistrationBanner
   }

   const dispatch = useDispatch()
   const [burgerMenu, setBurgerMenu] = useState(false)

   const [isModal, setIsModal] = useState(false)
   const [successModal, setSuccessModal] = useState(false)
   const successModalHandler = () => setSuccessModal((prevState) => !prevState)
   const modalHandler = () => setIsModal((prevState) => !prevState)
   const [scrollY, setScrollY] = useState(0)
   const scrollYMoved = scrollY > 0

   const { pathname } = useRouter()

   useEffect(() => {
      setScrollY(window.scrollY)
      const scrollHandler = () => {
         setScrollY(window.scrollY)
      }
      window.addEventListener('scroll', scrollHandler)
      return () => window.removeEventListener('resize', scrollHandler)
   }, [setScrollY])

   const handleBurgerMenu = () => {
      setBurgerMenu(!burgerMenu)
   }
   const isVisibleIcon = scrollYMoved || pathname !== '/'

   const isVisibleTimeIcon = () => {
      if (!isVisibleIcon) {
         return <Image src={timeIcon} alt="time" />
      }
      return ''
   }
   const isVisiblePhoneIcon = () => {
      if (!isVisibleIcon) {
         return <Image src={phoneIcon} alt="icon" />
      }
      return ''
   }
   async function sendApplication(userInformation) {
      dispatch(generalActions.removeUserResponse())
      dispatch(
         sendUserApplitaction({
            userInformation,
            setSuccessModal,
            modalHandler,
         })
      )
   }

   const getActiveBannersButton = useCallback(() => {
      if (getButtonTitle()) {
         return (
            <div>
               <Link href="/courses">
                  <Button
                     submission={
                        getButtonTitle() ? 'Регистрация' : 'Получить информацию'
                     }
                     className={styles.registrationButton}
                  />
               </Link>
            </div>
         )
      }
      return (
         <Button
            onClick={modalHandler}
            submission={
               getButtonTitle() ? 'Регистрация' : 'Получить информацию'
            }
            className={styles.button}
         />
      )
   }, [banners])
   const getClassnamesForNavBar = () => {
      if (
         scrollYMoved ||
         (pathname !== '/' &&
            pathname !== '/compLiteracy' &&
            pathname !== '/backend')
      ) {
         return styles.scrolled
      }
      return ''
   }
   return (
      <>
         <SpinnerLoading isLoading={isLoading} width={120} height={120} />
         <Modal isOpen={isModal} onCloseBackDrop={modalHandler}>
            <InformationForm
               onSubmitHadnler={sendApplication}
               onClose={modalHandler}
            />
         </Modal>
         <Modal isOpen={successModal} onCloseBackDrop={successModalHandler}>
            <SuccessMessage
               responseMessage={{
                  success: succesUserRequest,
                  error: userRequestError,
               }}
            />
         </Modal>
         <div
            className={`${styles.container} ${getClassnamesForNavBar()}  ${
               pathname !== '/' && pathname !== '/compLiteracy'
                  ? styles.back_shadow
                  : ''
            }`}
         >
            <AnimatePresence>
               {burgerMenu && (
                  <BurgerMenu handleBurgerMenu={handleBurgerMenu} />
               )}
            </AnimatePresence>
            <div className={styles.innerContainer}>
               <div className={styles.peaksoftLogo}>
                  <Link href="/">
                     {scrollYMoved && !pathname !== '/' ? (
                        <Image src={peaksoftWhiteText} layout="fixed" />
                     ) : (
                        <Image src={whiteLogo} layout="fixed" />
                     )}
                  </Link>
               </div>
               <ul className={styles.menuNav}>
                  <li>
                     <ScrollLink
                        to="about"
                        spy
                        smooth
                        offset={-100}
                        duration={2000}
                     >
                        O нас
                     </ScrollLink>
                  </li>
                  <li className={styles.navMenu}>
                     IT курсы
                     <ul className={styles.dropdownMenu}>
                        <li className={styles.submenu}>
                           <Link className={styles.a} href="/backend">
                              Back-end
                           </Link>
                        </li>
                        {/* <li className={styles.submenu}>
                           <Link className={styles.a} href="/compLiteracy">
                              Компьютерная грамотность
                           </Link>
                        </li> */}
                     </ul>
                  </li>
                  <li>
                     <ScrollLink
                        to="graduates"
                        spy
                        smooth
                        offset={-300}
                        duration={1500}
                     >
                        наши выпускники
                     </ScrollLink>
                  </li>
                  <li>
                     <ScrollLink
                        to="contacts"
                        spy
                        smooth
                        offset={-100}
                        duration={1500}
                     >
                        контакты
                     </ScrollLink>
                  </li>
               </ul>
               <div className={styles.right}>
                  <ul className={styles.menuInfo}>
                     <li className={styles.date}>
                        {isVisibleTimeIcon()}
                        <span> ПН - СБ 11:00 - 22:00</span>
                     </li>
                     <li className={styles.number}>
                        {isVisiblePhoneIcon()}
                        <span>+7(991) 224-50-873</span>
                     </li>
                  </ul>
                  <div className={styles.wrapperButton}>
                     {getActiveBannersButton()}
                  </div>
                  <div className={styles.burgerMenuIcons}>
                     {scrollYMoved || pathname !== '/' ? (
                        <Image
                           onClick={handleBurgerMenu}
                           src={burgerMenuBlack}
                           layout="fixed"
                        />
                     ) : (
                        <Image
                           onClick={handleBurgerMenu}
                           src={burgerMenuWhite}
                           layout="fixed"
                        />
                     )}
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default NavBar
