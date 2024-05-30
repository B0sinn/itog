import { useState } from 'react'
import styles from './auth.module.css'
import { Button, Form, FormProps, Input, Space, Typography } from 'antd'
import { useTypedDispatch } from '../../hooks/redux.ts'
import { ILoginAuthValues, IRegisterAuthValues } from '../../models/auth/auth.types.ts'
import authActionsCreators from '../../store/reducers/Auth/AuthActionsCreators.ts'

const Auth = () => {
  const dispatch = useTypedDispatch()
  const [authType, _setAuthType] = useState('register')

  const onLogin: FormProps<ILoginAuthValues>['onFinish'] = (values) => {
    dispatch(authActionsCreators.login(values))
  }

  const onRegister: FormProps<IRegisterAuthValues>['onFinish'] = (values) => {
    dispatch(authActionsCreators.register(values))
  }

  return (
    <div className={styles.container}>
      <Form
        name="basic"
        layout={'vertical'}
        initialValues={{ remember: true }}
        onFinish={authType === 'login' ? onLogin : onRegister}
        autoComplete="off"
      >
        <Typography.Title level={2}>
          {authType === 'login' ? 'Вход' : 'Регистрация'}
        </Typography.Title>
        {authType === 'register' && (
          <>
            <Form.Item<IRegisterAuthValues>
              label="Ссылка на аватарку"
              name="avatar_url"
              rules={[{ required: true, message: 'Введите ccылку на аватарку' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<IRegisterAuthValues>
              label="Имя"
              name="name"
              rules={[{ required: true, message: 'Введите имя пользователя' }]}
            >
              <Input />
            </Form.Item>
          </>
        )}
        <Form.Item<IRegisterAuthValues>
          label="Почта"
          name="email"
          rules={[{ required: true, message: 'Введите почту' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<IRegisterAuthValues>
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Auth
