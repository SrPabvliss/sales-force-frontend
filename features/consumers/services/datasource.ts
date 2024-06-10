import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { HttpHandler } from '@/core/interfaces/HttpHandler'
import { API_ROUTES } from '@/shared/api-routes/api-routes'

import { IConsumer, ICreateConsumer, IUpdateConsumer } from '../models/IConsumer'

export interface ConsumersDatasource {
  getAll(): Promise<IConsumer[]>
  create(consumer: ICreateConsumer): Promise<IConsumer>
  update(id: number, consumer: IUpdateConsumer): Promise<IConsumer>
  delete(id: number): Promise<boolean>
}

export class ConsumersDatasourceImpl implements ConsumersDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): ConsumersDatasourceImpl {
    return new ConsumersDatasourceImpl()
  }

  async getAll(): Promise<IConsumer[]> {
    return await this.httpClient.get<IConsumer[]>(API_ROUTES.CONSUMERS.GET)
  }

  async create(consumer: ICreateConsumer): Promise<IConsumer> {
    return await this.httpClient.post<IConsumer>(API_ROUTES.CONSUMERS.CREATE, consumer)
  }

  async update(id: number, consumer: IUpdateConsumer): Promise<IConsumer> {
    return await this.httpClient.patch<IConsumer>(API_ROUTES.CONSUMERS.UPDATE(id), consumer)
  }

  async delete(id: number): Promise<boolean> {
    return await this.httpClient.patch<boolean>(`${API_ROUTES.CONSUMERS.TOGGLE_ACTIVE(id)}`)
  }
}
