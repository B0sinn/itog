import AuthContext from './provider'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { urls } from '../navigation/app.urls.ts'
import UserListPage from '../pages/users/pages/UserListPage'
import UserIdPage from '../pages/users/pages/UserIdPage'

const App = () => {
  useEffect(() => {
    if (location.pathname === '/') {
      location.replace(urls.users)
    }
  }, [])

  return (
    <AuthContext>
      <Routes>
        <Route path={urls.users} element={<UserListPage />} />
        <Route path={urls.userId} element={<UserIdPage />} />
      </Routes>
    </AuthContext>
  )
}

export default App
