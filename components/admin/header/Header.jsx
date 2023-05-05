import Image from 'next/image'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import PeaksoftLogo from '../../../public/adminIcons/peaksoftIcon.svg'
import classes from './Header.module.css'
import dropDownIcon from '../../../public/adminIcons/arrowDown.svg'
import { ActiveLink } from '../../UI/activeLink/ActiveLink'
import { Modal } from '../../UI/modal/modalWindow/Modal'
import Logout from '../logoutLayout/Logout'
import { localstorage } from '../../../utils/helpers/helpers'

export default function Header() {
   const [exit, setExit] = useState(false)
   const [isModal, setIsModal] = useState(false)
   const exitHandler = () => setExit((prevState) => !prevState)
   const { push } = useRouter()

   const onLogoutHandler = () => {
      localstorage.remove('token')
      push('/signIn')
   }

   const getLogoutComponent = useCallback(() => {
      const exitButton = (
         <button className={classes.logout} onClick={modalHandler}>
            Выйти
         </button>
      )
      return exit && exitButton
   }, [exit])

   const modalHandler = () => {
      setIsModal((prevState) => !prevState)
      setExit(false)
   }
   return (
      <div className={classes.mainContainer}>
         <Modal isOpen={isModal} onCloseBackDrop={modalHandler}>
            <Logout
               canselLogout={modalHandler}
               onLogoutHandler={onLogoutHandler}
            />
         </Modal>
         <header className={classes.header}>
            <div>
               <Image src={PeaksoftLogo} />
            </div>
            <nav className={classes.navigationStyles}>
               <ActiveLink href="/banners">Баннер</ActiveLink>
               <ActiveLink href="/requests">Заявки</ActiveLink>
            </nav>
            <div className={classes.logoutContainer}>
               <button
                  className={classes.adminButtonStyles}
                  onClick={exitHandler}
               >
                  Администратор{' '}
                  <span
                     className={`${classes.arrowIconStyles} ${
                        exit && classes.arrowRotate
                     }`}
                  >
                     <Image src={dropDownIcon} />
                  </span>
               </button>
               {getLogoutComponent()}
            </div>
         </header>
      </div>
   )
}
