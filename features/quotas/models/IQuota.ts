export interface IQuota {
  id: number
  startDate: Date
  endDate: Date
  goal: number
  commission: number
  isAchieved: boolean
  isActive: boolean
  //   employee: IEmployee
}

export interface ICreateQuota extends Omit<IQuota, 'id'> {}

export interface IUpdateQuota extends Partial<ICreateQuota> {}
