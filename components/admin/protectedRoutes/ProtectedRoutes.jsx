import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { localstorage } from '../../../utils/helpers/helpers'

const WithAuth = ({ children }) => {
   const router = useRouter()
   const [token, setToken] = useState(null)

   useEffect(() => {
      const tokenLocal = localstorage.get('token')
      setToken(tokenLocal)
      if (router.pathname !== '/signIn' && tokenLocal === null) {
         router.push('/signIn')
      }
   }, [])

   if (!token) return null
   return children
}

export default WithAuth
