import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'

const initState = {
   courses: [],
   consultation: [],
   allBanners: [],
   infoBanners: [],
   isLoading: null,
   userRequestError: null,
   succesUserRequest: null,
}

export const sendUserApplitaction = createAsyncThunk(
   'students/sendApplication',
   async (
      { userInformation, setSuccessModal, modalHandler = null },
      { dispatch }
   ) => {
      try {
         const response = await baseFetch({
            method: 'POST',
            path: `offices/2/consultations`,
            body: userInformation,
         })
         if (response.message) {
            setSuccessModal(true)
            return modalHandler ? modalHandler() : response
         }
         return response
      } catch (error) {
         setSuccessModal(true)
         return dispatch(generalActions.setErrorAfterRequest(error.message))
      }
   }
)

export const sendStudentRegistrationForm = createAsyncThunk(
   'students/sendForm',
   async (
      { studentInfo, setSuccessModal, modalHandler = null },
      { dispatch }
   ) => {
      try {
         const response = await baseFetch({
            method: 'POST',
            path: `banners/${studentInfo.bannerId}/students`,
            body: studentInfo,
         })
         if (response.message) {
            setSuccessModal(true)
            return modalHandler ? modalHandler() : response
         }
         return response
      } catch (error) {
         setSuccessModal(true)
         return dispatch(generalActions.setErrorAfterRequest(error.message))
      }
   }
)

export const getAllCourses = createAsyncThunk(
   'courses/getCourses',
   async (_, { rejectWithValue, dispatch }) => {
      try {
         const response = baseFetch({
            path: 'courseTypes?getCourseType=REGISTRATION',
         })
         dispatch(generalActions.getCourses(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
const setFulfilled = (state) => {
   state.isLoading = false
}
const setPending = (state) => {
   state.isLoading = true
}
const setError = (state) => {
   state.isLoading = false
}

const setStudentPending = (state) => {
   state.isLoading = true
}
export const generalSlice = createSlice({
   name: 'general',
   initialState: initState,
   reducers: {
      getServerData(state, action) {
         state.courses = action.payload.courseType
         state.consultation = action.payload.courseTypeConsultation
         state.allBanners = action.payload.banners
         state.infoBanners = action.payload.infoBanners
      },
      getCourses(state, action) {
         state.courses = action.payload
      },
      getBanners(state, action) {
         state.allBanners = action.payload
      },
      getInfoBanners(state, action) {
         state.infoBanners = action.payload
      },
      getConsultation(state, action) {
         state.consultation = action.payload
      },
      removeUserResponse(state) {
         state.succesUserRequest = null
         state.userRequestError = null
      },
      setUserRequestError(state) {
         state.userRequestError = true
      },
      setErrorAfterRequest(state, action) {
         state.isLoading = false
         state.userRequestError = action.payload
      },
   },
   extraReducers: {
      [getAllCourses.pending]: setPending,
      [getAllCourses.fulfilled]: setFulfilled,
      [getAllCourses.rejected]: setError,
      [sendUserApplitaction.pending]: setStudentPending,
      [sendUserApplitaction.fulfilled]: (state, action) => {
         state.isLoading = false
         state.succesUserRequest = action.payload
      },

      [sendStudentRegistrationForm.pending]: (state) => {
         state.isLoading = true
      },
      [sendStudentRegistrationForm.fulfilled]: (state, action) => {
         state.isLoading = false
         state.succesUserRequest = action.payload
      },
      [sendStudentRegistrationForm.rejected]: (state, action) => {
         state.isLoading = false
         state.userRequestError = action.payload
      },
   },
})
export const generalActions = generalSlice.actions
