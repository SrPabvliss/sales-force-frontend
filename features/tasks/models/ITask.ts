import { IDelegation } from '@/features/delegations/models/IDelegation'

export enum TaskStatus {
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
  RESCHEDULED = 'RESCHEDULED',
  PENDING = 'PENDING',
}

export enum TaskType {
  VISIT = 'VISIT',
  CALL = 'CALL',
}

export interface ITask {
  id: number
  date: Date
  createdAt?: Date
  status: TaskStatus | null
  type: TaskType
  estimatedTime: number | null
  delegation: IDelegation
  comments: IComment[]
}

export interface IComment {
  id: number
  content: string
}

export interface ICreateTask
  extends Omit<ITask, 'id' | 'status' | 'estimatedTime' | 'comments' | 'delegation' | 'createdAt'> {
  status?: TaskStatus
  estimatedTime?: number
  delegationId: number
}

export interface IUpdateTask extends Partial<ICreateTask> {}
