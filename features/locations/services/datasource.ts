import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { HttpHandler } from '@/core/interfaces/HttpHandler'
import { API_ROUTES } from '@/shared/api-routes/api-routes'

import { ILocation, ILocationCreate, ILocationUpdate } from '../models/ILocation'

export interface LocationsDatasource {
  getAll(): Promise<ILocation[]>
  create(location: ILocationCreate): Promise<ILocation>
  update(id: number, location: ILocationUpdate): Promise<ILocation>
  delete(id: number): Promise<boolean>
}

export class ProductDataSourceImpl implements LocationsDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): ProductDataSourceImpl {
    return new ProductDataSourceImpl()
  }

  async getAll(): Promise<ILocation[]> {
    return await this.httpClient.get<ILocation[]>(API_ROUTES.LOCATIONS.GET)
  }

  async create(location: ILocationCreate): Promise<ILocation> {
    return await this.httpClient.post<ILocation>(API_ROUTES.LOCATIONS.CREATE, location)
  }

  async update(id: number, location: ILocationUpdate): Promise<ILocation> {
    return await this.httpClient.patch<ILocation>(`${API_ROUTES.LOCATIONS.UPDATE(id)}`, location)
  }

  async delete(id: number): Promise<boolean> {
    return await this.httpClient.delete<boolean>(`${API_ROUTES.LOCATIONS.DELETE(id)}`)
  }
}
