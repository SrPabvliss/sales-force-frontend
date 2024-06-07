import { IPerson } from '@/shared/interfaces/IPerson'

export enum EmployeeRole {
  SELLER = 'SELLER',
  SUPERVISOR = 'SUPERVISOR',
  ADMIN = 'ADMIN',
}
export interface IUser {
  id: number
  role: EmployeeRole
  isActive: boolean
  person: IPerson
}

export interface IAuth {
  username: string
  password: string
}
