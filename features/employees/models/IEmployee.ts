import { EmployeeRole } from '@/features/auth/models/IUser'
import { ICreatePerson, IPerson } from '@/shared/interfaces/IPerson'

export interface IEmployee {
  id: number
  username: string
  role: EmployeeRole
  isActive: boolean
  person: IPerson
}

export interface ICreateEmployee extends Omit<IEmployee, 'id' | 'person'> {
  person: ICreatePerson
  password: string
  moduleId: number[]
}

export interface IUpdateEmployee extends Partial<ICreateEmployee> {}
