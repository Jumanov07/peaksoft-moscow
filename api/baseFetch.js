// const SERVER_BASE_URL = 'https://peaksoft.house:5000/api'
const SERVER_BASE_URL = 'http://peaksoft.house:5001/api'

export const baseFetch = async (options, responseOption, token = null) => {
   try {
      const { path, body, method } = options
      const requestOptions = {
         method: method || 'GET',
         headers: token
            ? {
                 'Content-Type': 'application/json',
                 Authorization: `Bearer ${token}`,
              }
            : { 'Content-Type': 'application/json' },
      }
      if (method !== 'GET') {
         requestOptions.body = JSON.stringify(body || {})
      }
      const response = await fetch(`${SERVER_BASE_URL}/${path}`, requestOptions)
      const result = responseOption?.asText
         ? await response.text()
         : await response.json()

      if (!response.ok) {
         let errorMessage = 'Something went wrong'
         if (result && result.message) {
            errorMessage = result.message
         }
         throw new Error(errorMessage)
      }
      return result
   } catch (e) {
      throw new Error(e.message)
   }
}
