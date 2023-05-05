import Link from 'next/link'
import React from 'react'
import styles from './Breadcrumbs.module.css'

const BreadCrumbs = ({ breadCrumbs }) => {
   return (
      <div className={styles.breadCrumbs}>
         {breadCrumbs.map(({ pathName, path, id }) => {
            return (
               <Link href={path} key={id}>
                  <a className={styles.link}>
                     <span className={styles.path_name}>{pathName}</span>
                  </a>
               </Link>
            )
         })}
      </div>
   )
}

export default BreadCrumbs
