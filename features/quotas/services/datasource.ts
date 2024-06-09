import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { HttpHandler } from '@/core/interfaces/HttpHandler'
import { API_ROUTES } from '@/shared/api-routes/api-routes'

import { ICreateQuota, IUpdateQuota, IQuota } from '../models/IQuota'

export interface QuotasDatasource {
  getAll(): Promise<IQuota[]>
  create(location: ICreateQuota): Promise<IQuota>
  update(id: number, location: IUpdateQuota): Promise<IQuota>
  delete(id: number): Promise<boolean>
}

export class QuotaDataSourceImpl implements QuotasDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): QuotaDataSourceImpl {
    return new QuotaDataSourceImpl()
  }

  async getAll(): Promise<IQuota[]> {
    return await this.httpClient.get<IQuota[]>(API_ROUTES.LOCATIONS.GET)
  }

  async create(location: ICreateQuota): Promise<IQuota> {
    return await this.httpClient.post<IQuota>(API_ROUTES.LOCATIONS.CREATE, location)
  }

  async update(id: number, location: IUpdateQuota): Promise<IQuota> {
    return await this.httpClient.patch<IQuota>(`${API_ROUTES.LOCATIONS.UPDATE(id)}`, location)
  }

  async delete(id: number): Promise<boolean> {
    return await this.httpClient.delete<boolean>(`${API_ROUTES.LOCATIONS.DELETE(id)}`)
  }
}
