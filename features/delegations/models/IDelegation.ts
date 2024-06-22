import { IConsumer } from '@/features/consumers/models/IConsumer'
import { IEmployee } from '@/features/users/models/IEmployee'

export interface IDelegation {
  id: number
  isActive: boolean
  consumer: IConsumer
  employee: IEmployee
}

export interface ICreateDelegation extends Omit<IDelegation, 'id' | 'consumer' | 'employee'> {
  consumerId: number
  employeeId: number
}

export interface IUpdateDelegation extends Partial<ICreateDelegation> {}
