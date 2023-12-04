import { Roles } from '@/enums/Roles'

export interface IUser {
  id: number
  nickname: string
  email: string
  password: string
  fullName: string
  roles?: Roles[]
}
