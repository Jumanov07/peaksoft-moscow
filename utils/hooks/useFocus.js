import { useEffect, useState } from 'react'

let observer = null

export default function useOnScreen(ref) {
   const [isIntersecting, setIntersecting] = useState(false)
   useEffect(() => {
      observer = new IntersectionObserver(([entry]) =>
         setIntersecting(entry.isIntersecting)
      )
   }, [])
   useEffect(() => {
      observer.observe(ref.current)
      return () => {
         observer.disconnect()
      }
   }, [])
   return isIntersecting
}
