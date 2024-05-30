import { useTypedDispatch, useTypedSelector } from '../../../../hooks/redux.ts'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import usersActionsCreators from '../../../../store/reducers/Users/UsersActionsCreators.ts'
import styles from '../../user.module.css'
import { Flex, Typography, Image, Button, Spin } from 'antd'

const UserIdPage = () => {
  const dispatch = useTypedDispatch()
  const usersState = useTypedSelector((state) => state.userSlice)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(usersActionsCreators.getUserId({ userId: params.id }))
  }, [dispatch, params.id])

  if (usersState.isLoading) {
    return <Spin fullscreen size="large" />
  }

  return (
    <Flex className={styles.listItem} vertical>
      <Button onClick={() => navigate(`/users`)} type="primary" htmlType="button">
        Назад
      </Button>
      <Image width={200} src={usersState.userData?.avatar} />
      <Typography.Text strong>Имя: {usersState.userData?.first_name}</Typography.Text>
      <Typography.Text strong>Фамилия: {usersState.userData?.last_name}</Typography.Text>
      <Typography.Text strong>Почта: {usersState.userData?.email}</Typography.Text>
    </Flex>
  )
}

export default UserIdPage
