import Image from 'next/image'
import classes from './UserApplicationHeader.module.css'
import deleteIcon from '../../../public/adminIcons/deleteIcon.svg'
import ExcelCheckbox from '../../UI/excelCheckbox/ExcelCheckbox'

export default function UserApplicationHeader({
   onSelecAll,
   onDeleteApplications,
   select,
}) {
   return (
      <div className={classes.userApplicationHeader}>
         <div className={classes.usersUtils}>
            <ExcelCheckbox
               type="checkbox"
               name="selectAll"
               id="selecAll"
               handleClick={onSelecAll}
               isChecked={select}
            />
            <Image
               src={deleteIcon}
               width={20}
               height={20}
               alt="deleteIcon"
               onClick={onDeleteApplications}
            />
            <p>№</p>
            <p>Имя</p>
         </div>
         <div className={classes.usersInfo}>
            <p>Дата</p>
            <p>Номер телефона</p>
            <p>Тип курса</p>
            <p>Обработан</p>
            <p>Действия</p>
         </div>
      </div>
   )
}
