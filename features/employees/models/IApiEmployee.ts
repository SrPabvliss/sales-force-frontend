import { EmployeeRole } from '@/features/auth/models/IUser'
import { IPerson } from '@/shared/interfaces/IPerson'

export interface IApiEmployee {
  id: number
  username: string
  password: string
  role: EmployeeRole
  isActive: boolean
  person: IPerson
}
