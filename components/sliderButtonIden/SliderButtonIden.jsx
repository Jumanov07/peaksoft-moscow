import styles from './SliderButtonIden.module.css'

export default function SliderButtonIden({ indicator }) {
   const dataIden = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]

   return (
      <div className={styles.container}>
         <div className={styles.statusButtons}>
            {dataIden.map((el) => {
               return (
                  <div
                     key={el.id}
                     className={`${styles.buttonStatus} ${
                        indicator === el.id ? styles.activeButton : ''
                     }`}
                  />
               )
            })}
         </div>
      </div>
   )
}
