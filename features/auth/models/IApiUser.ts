import { IPerson } from '@/shared/interfaces/IPerson'

import { EmployeeRole } from './IUser'

interface IEmployee {
  id: number
  username: string
  password: string
  role: EmployeeRole
  isActive: boolean
  person: IPerson
}

export interface IApiUser {
  token: string
  employee: IEmployee
}
