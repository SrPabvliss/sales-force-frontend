import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { HttpHandler } from '@/core/interfaces/HttpHandler'
import { API_ROUTES } from '@/shared/api-routes/api-routes'

import { BrandAdapter } from '../adapters/brand-adapter'
import { IApiBrand } from '../models/IApiBrands'
import { IBrand } from '../models/IBrands'

export interface BrandsDatasource {
  getAll(): Promise<IBrand[]>
  create(brand: IBrand): Promise<IBrand>
  update(id: number, brand: Partial<IBrand>): Promise<IBrand>
  delete(id: number): Promise<boolean>
}

export class BrandsDatasourceImpl implements BrandsDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): BrandsDatasourceImpl {
    return new BrandsDatasourceImpl()
  }

  async getAll(): Promise<IBrand[]> {
    const rawData = await this.httpClient.get<IApiBrand[]>(API_ROUTES.BRANDS.GET)
    return BrandAdapter.toDomainList(rawData)
  }

  async create(brand: Omit<IBrand, 'id'>): Promise<IBrand> {
    return await this.httpClient.post<IBrand>(API_ROUTES.BRANDS.CREATE, brand)
  }

  async update(id: number, brand: Partial<IBrand>): Promise<IBrand> {
    return await this.httpClient.patch<IBrand>(API_ROUTES.BRANDS.UPDATE(id), brand)
  }

  async delete(id: number): Promise<boolean> {
    return await this.httpClient.delete<boolean>(`${API_ROUTES.BRANDS.DELETE(id)}`)
  }
}
