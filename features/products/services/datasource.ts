import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { HttpHandler } from '@/core/interfaces/HttpHandler'
import { API_ROUTES } from '@/shared/api-routes/api-routes'

import { IProduct, IProductCreate, IProductUpdate } from '../models/IProduct'

export interface ProductsDatasource {
  getAll(): Promise<IProduct[]>
  create(product: IProductCreate): Promise<IProduct>
  update(id: number, product: IProductUpdate): Promise<IProduct>
  delete(id: number): Promise<boolean>
}

export class ProductsDatasourceImpl implements ProductsDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): ProductsDatasourceImpl {
    return new ProductsDatasourceImpl()
  }

  async getAll(): Promise<IProduct[]> {
    return await this.httpClient.get<IProduct[]>(API_ROUTES.PRODUCTS.GET)
  }

  async create(product: IProductCreate): Promise<IProduct> {
    return await this.httpClient.post<IProduct>(API_ROUTES.PRODUCTS.CREATE, product)
  }

  async update(id: number, product: IProductUpdate): Promise<IProduct> {
    return await this.httpClient.patch<IProduct>(`${API_ROUTES.PRODUCTS.UPDATE(id)}`, product)
  }

  async delete(id: number): Promise<boolean> {
    return await this.httpClient.delete<boolean>(`${API_ROUTES.PRODUCTS.DELETE(id)}`)
  }
}
