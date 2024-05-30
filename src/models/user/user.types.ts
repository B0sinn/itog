export interface IUser {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export interface IUserResponse {
  data: {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: IUser[]
  }
}

export interface IUserIdResponse {
  data: {
    data: IUser
  }
}

export interface IGetUserListDto {
  userId: string | undefined
  page: number
}

export interface IUpdateUserDTO {
  userId: number
  name: string
  job: string
}

export interface IUpdateUserResponse {
  name: string
  job: string
  updatedAt: Date
}
