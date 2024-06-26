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

export interface ICreateProduct extends Omit<IProduct, 'id' | 'category' | 'brand'> {
  brandId: number
  categoryId: number
}

export interface IUpdateProduct extends Partial<ICreateProduct> {}
