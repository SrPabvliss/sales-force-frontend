export interface ICategory {
  id: number
  name: string
  isActive: boolean
}

export interface ICreateCategory extends Omit<ICategory, 'id'> {}

export interface IUpdateCategory extends Partial<ICreateCategory> {}
