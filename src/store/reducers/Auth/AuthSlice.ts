import { createSlice } from '@reduxjs/toolkit'
import authActionsCreators from './AuthActionsCreators.ts'

export interface IAuthState {
  isLoading: boolean
  error: string | undefined
  data: {
    id: number
    token: string | any
  }
}

export const initialState: IAuthState = {
  isLoading: false,
  error: '',
  data: {
    id: localStorage.getItem('id') ? Number(localStorage.getItem('id')) : 0,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authActionsCreators.login.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(authActionsCreators.login.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(authActionsCreators.login.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload?.errorMessage
    })
    builder.addCase(authActionsCreators.register.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(authActionsCreators.register.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(authActionsCreators.register.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload?.errorMessage
    })
  },
})

export default authSlice.reducer
