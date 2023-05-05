import Image from 'next/image'
import classses from './Search.module.css'
import searchIcon from '../../../public/adminIcons/searchIcon.svg'
import InputField from '../inputField/InputField'

const Search = ({ findToStudentHandler }) => {
   function inputHandler(e) {
      findToStudentHandler(e.target.value)
   }
   return (
      <div className={classses.searchContainer}>
         <InputField
            type="text"
            placeholder="Введите имя, фамилию или номер телефона"
            onChange={inputHandler}
         />
         <span className={classses.icon}>
            <Image src={searchIcon} width={20} height={20} />
         </span>
      </div>
   )
}

export default Search
