import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { HttpHandler } from '@/core/interfaces/HttpHandler'
import { API_ROUTES } from '@/shared/api-routes/api-routes'

import { IService, ICreateService, IUpdateService } from '../models/IService'

export interface ServicesDataSource {
  getAll(): Promise<IService[]>
  create(service: ICreateService): Promise<IService>
  update(id: number, service: IUpdateService): Promise<IService>
  delete(id: number): Promise<boolean>
}

export class ServicesDataSourceImpl implements ServicesDataSource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): ServicesDataSourceImpl {
    return new ServicesDataSourceImpl()
  }

  async getAll(): Promise<IService[]> {
    return await this.httpClient.get<IService[]>(API_ROUTES.SERVICES.GET)
  }

  async create(service: ICreateService): Promise<IService> {
    return await this.httpClient.post<IService>(API_ROUTES.SERVICES.CREATE, service)
  }

  async update(id: number, service: IUpdateService): Promise<IService> {
    return await this.httpClient.patch<IService>(`${API_ROUTES.SERVICES.UPDATE(id)}`, service)
  }

  async delete(id: number): Promise<boolean> {
    return await this.httpClient.patch<boolean>(`${API_ROUTES.SERVICES.TOGGLE_ACTIVE(id)}`)
  }
}
