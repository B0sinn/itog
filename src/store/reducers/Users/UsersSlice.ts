import { IUser } from '../../../models/user/user.types.ts'
import { createSlice } from '@reduxjs/toolkit'
import usersActionsCreators from './UsersActionsCreators.ts'

export interface IUserState {
  isLoading: boolean
  error: string | undefined
  data: IUser[]
  userData: IUser | undefined
}

export const initialState: IUserState = {
  isLoading: false,
  error: undefined,
  data: [],
  userData: {
    id: 0,
    avatar: '',
    email: '',
    first_name: '',
    last_name: '',
  },
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(usersActionsCreators.getUsers.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = undefined
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      state.data = payload.data
    })
    builder.addCase(usersActionsCreators.getUsers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(usersActionsCreators.getUserId.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = undefined
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      state.userData = payload.data
    })
    builder.addCase(usersActionsCreators.getUserId.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(usersActionsCreators.editUserId.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = undefined
      const index = state.data.findIndex(
        (val) => val.id == Number(localStorage.getItem('userEditId'))
      )
      state.data[index].first_name = payload.name
    })
    builder.addCase(usersActionsCreators.editUserId.pending, (state) => {
      state.isLoading = true
    })
  },
})

export default usersSlice.reducer
