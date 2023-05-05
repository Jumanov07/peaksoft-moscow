export const sendWithFormDataToApi = (requestOptions) => {
   const formData = new FormData()
   formData.append('file', requestOptions.file)
   const requestConfig = {
      method: 'POST',
      url: `https:peaksoft.house:5000/api/static/upload`,
      body: formData,
   }
   const response = sendFileToApi(requestConfig)
   return response
}

const sendFileToApi = async (requestConfig) => {
   const requestOptions = {
      method: requestConfig.method,
      body: requestConfig.body,
   }
   const response = await fetch(requestConfig.url, requestOptions)
   if (!response.ok) {
      throw new Error(response.message)
   }
   const result = await response.json()
   return result
}
