import Select from 'react-select'
import styles from './NewSelect.module.css'

const NewSelect = ({ placeholder = 'Выберите из списка', ...props }) => {
   function selectChangeHandler(course) {
      props.onSelectChange(course)
   }
   return (
      <>
         <Select
            getOptionLabel={props.getOptionLabel}
            getOptionValue={() => props.options.map((item) => item.id)}
            value={props.value}
            onChange={selectChangeHandler}
            options={props.options}
            placeholder={placeholder}
            className={styles.select}
            styles={{
               control: (baseStyles) => ({
                  ...baseStyles,
                  borderColor: props.error ? 'red' : '#BDBDBD',
               }),
            }}
         />
         <p className={styles.error}>{props.error}</p>
      </>
   )
}

export default NewSelect
