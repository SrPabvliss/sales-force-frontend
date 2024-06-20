import { IEmployee } from '@/features/users/models/IEmployee'

export interface IQuota {
  id: number
  startDate: Date
  endDate: Date
  goal: number
  commission: number
  isAchieved: boolean
  isActive: boolean
  employee: IEmployee
}

export interface ICreateQuota extends Omit<IQuota, 'id' | 'employee'> {
  employeeId: number
}

export interface IUpdateQuota extends Partial<ICreateQuota> {}
