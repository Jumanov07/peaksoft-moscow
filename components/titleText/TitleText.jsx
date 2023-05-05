import styles from './TitleText.module.css'

function TitleText({ text }) {
   return <div className={styles.container}>{text}</div>
}
export default TitleText
