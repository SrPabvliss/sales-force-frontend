import { IBrand } from '@/features/brands/models/IBrands'
import { ICategory } from '@/features/categories/models/ICategory'

export interface IProduct {
  id: number
  name: string
  description?: string
  isActive: boolean
  price: number
  stock: number
  brand: IBrand
  category: ICategory
}

export interface IProductCreate extends Omit<IProduct, 'id' | 'category' | 'brand'> {
  brandId: number
  categoryId: number
}

export interface IProductUpdate extends Partial<IProductCreate> {}
