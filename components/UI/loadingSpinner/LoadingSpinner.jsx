import { createPortal } from 'react-dom'
import React from 'react'
import { BallTriangle } from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import classes from './LoadingSpinner.module.css'

export default function SpinnerLoading({ width, height, isLoading }) {
   return isLoading ? (
      <>
         {createPortal(
            <div className={classes.loadingSpinner}>
               <BallTriangle color="#00BFFF" height={height} width={width} />
            </div>,
            document.querySelector('#modal')
         )}
      </>
   ) : null
}
