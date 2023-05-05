import { useCallback, useEffect, useState } from 'react'
const SERVER_BASE_URL = 'https://peaksoft.house:5000/api'

function useFetch(options) {
   const [data, setData] = useState(null)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)

   const httpRequest = useCallback(async () => {
      setLoading(true)
      setData(null)
      setError(null)
      const { path, body, method } = options
      const requestOptions = {
         method: method || 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      }
      if (method !== 'GET') {
         requestOptions.body = JSON.stringify(body || {})
      }
      try {
         const response = await fetch(
            `${SERVER_BASE_URL}/${path}`,
            requestOptions
         )
         let data = null
         if (response) {
            data = await response.json()
         } else {
            data = response
         }
         setData(data)
      } catch (error) {
         setError(error)
      } finally {
         setLoading(false)
      }
   }, [options])
   useEffect(() => {
      httpRequest()
   }, [options])
   return { data, error, loading }
}

export default useFetch
