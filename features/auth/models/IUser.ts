import { IPerson } from '@/shared/interfaces/IPerson'

export enum EmployeeRole {
  SELLER = 'SELLER',
  SUPERVISOR = 'SUPERVISOR',
  ADMIN = 'ADMIN',
}

export interface EmployeeTypeOption {
  value: EmployeeRole
  label: string
}

export const employeeTypeOptions: EmployeeTypeOption[] = [
  { value: EmployeeRole.SELLER, label: 'Vendedor' },
  { value: EmployeeRole.SUPERVISOR, label: 'Supervisor' },
  { value: EmployeeRole.ADMIN, label: 'Administrador' },
]
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
