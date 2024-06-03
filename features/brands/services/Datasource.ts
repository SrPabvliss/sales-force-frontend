import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { HttpHandler } from '@/core/interfaces/HttpHandler'
import { API_ROUTES } from '@/shared/api-routes/api-routes'

import { BrandAdapter } from '../adapters/BrandAdapter'
import { IApiBrand } from '../models/IApiBrands'
import { IBrand } from '../models/IBrands'

export interface BrandsDatasource {
  getAll(): Promise<IBrand[]>
  create(brand: IBrand): Promise<IBrand>
  update(brand: IBrand): Promise<IBrand>
  delete(brand: IBrand): Promise<void>
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

  async create(brand: IBrand): Promise<IBrand> {
    return brand
  }

  async update(brand: IBrand): Promise<IBrand> {
    return brand
  }

  async delete(brand: IBrand): Promise<void> {
    console.log('Deleted brand:', brand)
  }
}
