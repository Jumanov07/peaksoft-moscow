import arrowR from '../../public/img/LeftSlide.svg'
import styles from './SamplePrevArrow.module.css'

export default function SamplePrevArrow(props) {
   const { onClick } = props

   return (
      <button
         style={{ background: 'none' }}
         onClick={onClick}
         className={styles.prevArrow}
      >
         <svg
            src={arrowR}
            width="33"
            height="33"
            viewBox="0 0 41 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <circle
               className={styles.circle}
               r="20.5"
               transform="matrix(1 0 0 -1 20.5 20.5)"
               fill="#d6d6d6"
               style={styles.prevArrow}
            />
            <path
               fillRule="evenodd"
               clipRule="evenodd"
               d="M15.2273 20.6023C15.0076 20.8219 15.0076 21.1781 15.2273 21.3977L21.9773 28.1477C22.1969 28.3674 22.5531 28.3674 22.7727 28.1477C22.9924 27.9281 22.9924 27.5719 22.7727 27.3523L16.4205 21L22.7727 14.6477C22.9924 14.4281 22.9924 14.0719 22.7727 13.8523C22.5531 13.6326 22.1969 13.6326 21.9773 13.8523L15.2273 20.6023Z"
               fill="#F4F4F4"
               stroke="#F4F4F4"
               strokeWidth="1.5"
               strokeLinecap="round"
               strokeLinejoin="round"
            />
         </svg>
      </button>
   )
}
