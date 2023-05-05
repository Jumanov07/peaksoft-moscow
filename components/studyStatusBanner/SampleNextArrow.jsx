import arrowL from '../../public/img/SlideRight.svg'
import styles from './SampleNextArrow.module.css'

function SampleNextArrow(props) {
   const { onClick } = props
   return (
      <button
         style={{ background: 'none' }}
         className={styles.nextArrow}
         onClick={onClick}
      >
         <svg
            src={arrowL}
            width="33"
            height="33"
            viewBox="0 0 41 41"
            fill="#c9c9c9"
            xmlns="http://www.w3.org/2000/svg"
         >
            <circle
               className={styles.circle}
               cx="20.5"
               cy="20.5"
               r="20.5"
               transform="rotate(-180 20.5 20.5)"
               fill="#c9c9c9"
            />
            <path
               fillRule="evenodd"
               clipRule="evenodd"
               d="M25.7727 20.6023C25.9924 20.8219 25.9924 21.1781 25.7727 21.3977L19.0227 28.1477C18.8031 28.3674 18.4469 28.3674 18.2273 28.1477C18.0076 27.9281 18.0076 27.5719 18.2273 27.3523L24.5795 21L18.2273 14.6477C18.0076 14.4281 18.0076 14.0719 18.2273 13.8523C18.4469 13.6326 18.8031 13.6326 19.0227 13.8523L25.7727 20.6023Z"
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
export default SampleNextArrow
