import { useTypedDispatch, useTypedSelector } from '../../../../hooks/redux.ts'
import { useEffect, useMemo, useState } from 'react'
import usersActionsCreators from '../../../../store/reducers/Users/UsersActionsCreators.ts'
import styles from '../../user.module.css'
import { Avatar, Button, Empty, Flex, Layout, List, Select, Typography } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Search from 'antd/es/input/Search'
import { SearchProps } from 'antd/lib/input'
import useDebounce from '../../../../hooks/useDebounce.ts'
import Filters from '../../../../utils/const.ts'
import { useNavigate } from 'react-router-dom'

const UserListPage = () => {
  const dispatch = useTypedDispatch()
  const usersState = useTypedSelector((state) => state.userSlice)
  const [page, setPage] = useState(1)
  const [userFind, setUserFind] = useState('')
  const [selectedId, setSelectedId] = useState('all')
  const userDebounce = useDebounce(userFind, 500)
  const navigate = useNavigate()

  const onSearch: SearchProps['onSearch'] = (value) => {
    setUserFind(value)
  }

  const filteredUsers = useMemo(() => {
    let filteredData = [...usersState.data]

    if (selectedId !== 'all') {
      if (selectedId === 'odd') {
        filteredData = filteredData.filter((todo) => todo.id % 2 === 1)
      } else if (selectedId === 'even') {
        filteredData = filteredData.filter((todo) => todo.id % 2 === 0)
      }
    }

    if (userDebounce) {
      filteredData = filteredData.filter((item) => {
        return item.first_name.toLowerCase().includes(userDebounce.toLowerCase())
      })
    }

    return filteredData
  }, [selectedId, userDebounce, usersState.data])

  useEffect(() => {
    dispatch(usersActionsCreators.getUsers({ page: page }))
  }, [dispatch, page])

  return (
    <Layout className={styles.container}>
      <Header className={styles.header}>
        <Button
          onClick={() => {
            localStorage.removeItem('userId')
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            localStorage.removeItem('avatar')
            location.reload()
          }}
          type="primary"
          htmlType="button"
        >
          выйти
        </Button>

      </Header>
      <Content
        style={{
          justifyContent: usersState.data.length === 0 ? 'center' : 'flex-start',
        }}
        className={styles.content}
      >
        {usersState.data.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{ height: 60 }}
            description={<span>Пользователи отсутствуют</span>}
          ></Empty>
        ) : (
          <Flex className={styles.listItem} vertical>
            <Flex className={styles.filterBar}>
              <Search
                placeholder="input search text"
                onSearch={onSearch}
                style={{ width: 200 }}
              />
              <Typography.Text strong>Порядок id</Typography.Text>
              <Select
                defaultValue="all"
                style={{ minWidth: 120 }}
                onChange={(value) => setSelectedId(value)}
                options={Filters.filterId}
              />
            </Flex>
            <List
              pagination={{
                position: 'bottom',
                align: 'center',
                onChange: (page) => {
                  setPage(page)
                },
                pageSize: 6,
                defaultCurrent: 1,
                total: 12,
              }}
              className={styles.listItem}
              loading={usersState.isLoading}
              itemLayout="horizontal"
              dataSource={filteredUsers}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      onClick={() => navigate(`/users/${item.id}`)}
                      type="primary"
                      htmlType="button"
                    >
                      Обзор
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    style={{ marginLeft: '25px' }}
                    title={item.first_name}
                    description={item.last_name}
                  />
                </List.Item>
              )}
            />
          </Flex>
        )}
      </Content>
    </Layout>
  )
}

export default UserListPage
