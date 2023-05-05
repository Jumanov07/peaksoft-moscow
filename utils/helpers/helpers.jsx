export const handleValidation = (data) => {
   const errors = {}
   Object.keys(data).forEach((userkey) => {
      if (validateData[userkey]?.validation(data)) {
         errors[userkey] = validateData[userkey].error
      }
   })

   return errors
}

// const phoneRegex = /[0-9]/;

const validateData = {
   name: {
      validation(data) {
         if (!data.name.trim()) {
            this.error = 'Бош болушу мүмкүн эмес'
            return true
         }
         return false
      },
      error: '',
   },
   surname: {
      validation(data) {
         if (!data.surname.trim()) {
            this.error = 'Бош болушу мүмкүн эмес'
            return true
         }
         return false
      },
      error: '',
   },
   email: {
      validation(data) {
         if (!data.email.trim()) {
            this.error = 'туура эмес электрондук почта форматы'
            return true
         }
         return false
      },
      error: '',
   },
   phone: {
      validation(data) {
         if (data.phone.length < 9) {
            this.error = 'жарактуу телефон номерин киргизиңиз'
            return true
         }
         return false
      },
      error: '',
   },
   birthDate: {
      validation(data) {
         if (!data.birthDate.trim()) {
            this.error = 'Бош болушу мүмкүн эмес'
            return true
         }
         return false
      },
      error: '',
   },
   offline: {
      validation(data) {
         if (typeof data.offline !== 'boolean') {
            this.error = 'Бош болушу мүмкүн эмес'
            return true
         }
         return false
      },
      error: '',
   },
   online: {
      validation(data) {
         if (typeof data.offline !== 'boolean') {
            this.error = 'Бош болушу мүмкүн эмес'
            return true
         }
         return false
      },
      error: '',
   },
   description: {
      validation(data) {
         if (!data.description.trim()) {
            this.error = 'Бош болушу мүмкүн эмес'
            return true
         }
         return false
      },
      error: '',
   },
   direction: {
      validation(data) {
         if (data.direction.length === 0) {
            this.error = 'Бош болушу мүмкүн эмес'
            return true
         }
         return false
      },
      error: '',
   },
   password: {
      validation(data) {
         if (data.password.trim().length < 4) {
            this.error = 'Бош болушу мүмкүн эмес'
            return true
         }
         return false
      },
      error: '',
   },
   courseTypeId: {
      validation(data) {
         if (!data.courseTypeId) {
            this.error = 'Бош болушу мүмкүн эмес'
            return true
         }
         return false
      },
      error: '',
   },
   startDate: {
      validation(data) {
         if (!data.startDate.trim()) {
            this.error = 'Бош болушу мүмкүн эмес'
            return true
         }
         return false
      },
      error: '',
   },
   endDate: {
      validation(data) {
         if (!data.endDate.trim()) {
            this.error = 'Бош болушу мүмкүн эмес'
            return true
         }
         return false
      },
      error: '',
   },
}

// local Storage

export class localstorage {
   static save(key, value) {
      return localStorage.setItem(key, JSON.stringify(value))
   }

   static get(key) {
      return JSON.parse(localStorage.getItem(key))
   }

   static remove(key) {
      return localStorage.removeItem(key)
   }

   static clear() {
      return localStorage.clear()
   }
}

export const compareEndDateOfBanner = (endDate) => {
   const endDateObject = new Date(endDate).getTime()
   const todayDateObject = new Date().getTime()
   return endDateObject > todayDateObject
}
