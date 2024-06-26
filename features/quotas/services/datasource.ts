import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { HttpHandler } from '@/core/interfaces/HttpHandler'
import { API_ROUTES } from '@/shared/api-routes/api-routes'

import { ICreateQuota, IUpdateQuota, IQuota } from '../models/IQuota'

export interface QuotasDatasource {
  getAll(): Promise<IQuota[]>
  getByEmployee(id: number): Promise<IQuota[]>
  getQuota(id: number): Promise<IQuota>
  create(quota: ICreateQuota): Promise<IQuota>
  update(id: number, quota: IUpdateQuota): Promise<IQuota>
  toogleActive(id: number): Promise<boolean>
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
    return await this.httpClient.get<IQuota[]>(API_ROUTES.QUOTAS.GET)
  }

  async getByEmployee(id: number): Promise<IQuota[]> {
    return await this.httpClient.get<IQuota[]>(API_ROUTES.QUOTAS.GET_BY_EMPLOYEE(id))
  }

  async getQuota(id: number): Promise<IQuota> {
    return await this.httpClient.get<IQuota>(API_ROUTES.QUOTAS.GET_QUOTA(id))
  }

  async create(quota: ICreateQuota): Promise<IQuota> {
    return await this.httpClient.post<IQuota>(API_ROUTES.QUOTAS.CREATE, quota)
  }

  async update(id: number, quota: IUpdateQuota): Promise<IQuota> {
    return await this.httpClient.patch<IQuota>(`${API_ROUTES.QUOTAS.UPDATE(id)}`, quota)
  }

  async toogleActive(id: number): Promise<boolean> {
    return await this.httpClient.patch<boolean>(API_ROUTES.QUOTAS.TOGGLE_ACTIVE(id))
  }
}
