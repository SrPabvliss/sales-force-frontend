import { IPerson } from '@/shared/interfaces/IPerson'

enum EmployeeRole {
  SELLER = 'SELLER',
  SUPERVISOR = 'SUPERVISOR',
  ADMIN = 'ADMIN',
}

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
