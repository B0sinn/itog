export interface ILoginAuthValues {
  email: string
  password: string
}

export interface IRegisterAuthValues extends ILoginAuthValues {
  name: string
  avatar_url: string
}

export interface IRegisterResponse {
  id: number
  token: string
}

export interface ILoginResponse {
  data: {
    token: string
  }
}
