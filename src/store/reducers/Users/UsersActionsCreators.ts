import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  IGetUserListDto,
  IUpdateUserDTO,
  IUpdateUserResponse,
  IUserIdResponse,
  IUserResponse,
} from '../../../models/user/user.types.ts'
import { MyKnownError } from '../../../types/globalTypes.ts'
import { AxiosResponse } from 'axios'
import $host from '../../../http'

export const getUsers = createAsyncThunk<
  IUserResponse,
  Omit<IGetUserListDto, 'userId'>,
  { rejectValue: MyKnownError }
>('users/getUsers', async (dto, thunkAPI) => {
  try {
    const response: AxiosResponse<IUserResponse, any> = await $host.get<IUserResponse>(
      `users?page=${dto.page}`
    )
    console.log(response.data)
    return response.data
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.response?.data.message)
  }
})

export const getUserId = createAsyncThunk<
  IUserIdResponse,
  Omit<IGetUserListDto, 'page'>,
  { rejectValue: MyKnownError }
>('users/getUserId', async (dto, thunkAPI) => {
  try {
    const response: AxiosResponse<IUserIdResponse, any> =
      await $host.get<IUserIdResponse>(`users/${dto.userId}`)
    console.log(response.data)
    return response.data
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.response?.data.message)
  }
})

export const editUserId = createAsyncThunk<
  IUpdateUserResponse,
  IUpdateUserDTO,
  { rejectValue: MyKnownError }
>('users/editUserId', async (dto, thunkAPI) => {
  try {
    const response: AxiosResponse<IUpdateUserResponse, any> =
      await $host.patch<IUpdateUserResponse>(`users/${dto.userId}`, {
        ...dto,
        name: dto.name.trim(),
        job: dto.job.trim(),
      })
    localStorage.setItem('userEditId', dto.userId.toString())
    return response.data
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.response?.data.message)
  }
})

const usersActionsCreators = {
  getUsers,
  getUserId,
  editUserId,
}

export default usersActionsCreators
