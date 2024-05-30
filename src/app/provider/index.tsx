import { PropsWithChildren } from 'react'
import { useTypedSelector } from '../../hooks/redux.ts'
import { Spin } from 'antd'
import Auth from '../../pages/auth'

const AuthContext = (props: PropsWithChildren) => {
  const authState = useTypedSelector((state) => state.authSlice)

  if (authState.isLoading) {
    return <Spin fullscreen size="large" />
  }

  if (authState.data.token === '') {
    return <Auth />
  }

  return <>{props.children}</>
}

export default AuthContext
