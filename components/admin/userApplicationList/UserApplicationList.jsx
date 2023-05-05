import Paragraph from '../../UI/paragraph/Paragraph'
import UserApplicationItems from '../userApplicationItems/UserApplicationItems'

export default function UserApplicationList({
   applications,
   onChangeCheckbox,
}) {
   return (
      <div>
         {applications.length !== 0 ? (
            applications.map((item, index) => {
               return (
                  <UserApplicationItems
                     key={item.id}
                     item={item}
                     counter={index}
                     handleClick={onChangeCheckbox}
                  />
               )
            })
         ) : (
            <Paragraph>Список пуст</Paragraph>
         )}
      </div>
   )
}
