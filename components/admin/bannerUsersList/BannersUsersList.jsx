import { useState } from 'react'
import classes from './BannersUsersList.module.css'
import BannerItems from '../bannerItems/BannerItems'
import Paragraph from '../../UI/paragraph/Paragraph'

const BannersUsersList = (props) => {
   const [isAtcive, setIsActive] = useState([])
   function toggleHandle(index) {
      if (!isAtcive.includes(index)) {
         setIsActive([index])
         return
      }
      setIsActive([])
   }
   return (
      <div className={classes.list}>
         {props.users.length !== 0 ? (
            props.users.map((student, index) => {
               const isAciveInformation = index === isAtcive[0]
               return (
                  <BannerItems
                     isDownloaded={student.isDownloaded}
                     key={student.id}
                     name={student.name}
                     surname={student.surname}
                     phoneNumber={student.phone}
                     dateOfBirth={student.dateOfBirth}
                     email={student.email}
                     direction={student.courseType}
                     format={student.studyFormat}
                     comment={student.reason}
                     id={student.id}
                     index={index}
                     onChange={props.onChangeCheckbox}
                     isAcive={isAciveInformation}
                     toggleHandle={toggleHandle}
                     registrationDate={student.registeredAt}
                     additionalPhone={student.additionalPhone}
                  />
               )
            })
         ) : (
            <div className={classes.noUsersClassName}>
               <Paragraph>Список пуст</Paragraph>
            </div>
         )}
      </div>
   )
}

export default BannersUsersList
