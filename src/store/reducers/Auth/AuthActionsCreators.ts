import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  ILoginAuthValues,
  ILoginResponse,
  IRegisterAuthValues,
  IRegisterResponse,
} from '../../../models/auth/auth.types.ts'
import axios, { AxiosResponse } from 'axios'
import config from '../../../config.ts'
import { MyKnownError } from '../../../types/globalTypes.ts'

export const login = createAsyncThunk<
  ILoginResponse,
  ILoginAuthValues,
  { rejectValue: MyKnownError }
>('auth/login', async (dto, thunkAPI) => {
  try {
    const response: AxiosResponse<ILoginResponse, any> = await axios.post<ILoginResponse>(
      config.API_URL + '/login',
      dto
    )
    localStorage.setItem('token', response.data.data.token)
    location.reload()
    return response.data
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.response?.data.message)
  }
})

export const register = createAsyncThunk<
  IRegisterResponse,
  IRegisterAuthValues,
  { rejectValue: MyKnownError }
>('auth/register', async (dto, thunkAPI) => {
  try {
    const response: AxiosResponse<IRegisterResponse, any> =
      await axios.post<IRegisterResponse>(config.API_URL + '/register', {
        ...dto,
        email: dto.email,
        password: dto.password,
      })
    localStorage.setItem('userId', response.data.id.toString())
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('name', dto.name)
    localStorage.setItem('avatar', dto.avatar_url)
    location.reload()
    return response.data
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.response?.data.message)
  }
})

const authActionsCreators = {
  login,
  register,
}

export default authActionsCreators
