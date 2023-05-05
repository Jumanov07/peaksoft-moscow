import Result from '../result/Result'
import StagesLearning from '../stagesLearning/StagesLearning'
import WhatWillLearn from '../whatWillLearn/WhatWillLearn'
import styles from './BackComponent.module.css'

function BackComponent() {
   return (
      <div className={styles.container}>
         <div className={styles.backenddWrapper}>
            <div className={styles.wrapper}>
               <StagesLearning course="backend" />
               <WhatWillLearn course="backend" />
               <Result course="backend" />
            </div>
         </div>
      </div>
   )
}

export default BackComponent
