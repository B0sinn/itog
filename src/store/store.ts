import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/Auth/AuthSlice.ts'
import userSlice from './reducers/Users/UsersSlice.ts'

const rootReducer = combineReducers({
  authSlice,
  userSlice,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
