import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { HttpHandler } from '@/core/interfaces/HttpHandler'
import { API_ROUTES } from '@/shared/api-routes/api-routes'

import { ICreateTransaction, ITransaction, IUpdateTransaction } from '../models/ITransaction'

export interface TransactionsDataSource {
  getAll(): Promise<ITransaction[]>
  getById: (id: number) => Promise<ITransaction>
  create(transaction: ICreateTransaction): Promise<ITransaction>
  update(id: number, transaction: IUpdateTransaction): Promise<ITransaction>
  delete(id: number): Promise<boolean>
}

export class TransactionsDataSourceImpl implements TransactionsDataSource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): TransactionsDataSourceImpl {
    return new TransactionsDataSourceImpl()
  }

  async getAll(): Promise<ITransaction[]> {
    return await this.httpClient.get<ITransaction[]>(API_ROUTES.TASKS.GET_ALL)
  }

  async getById(id: number): Promise<ITransaction> {
    return await this.httpClient.get<ITransaction>(API_ROUTES.TASKS.GET_BY_ID(id))
  }

  async create(transaction: ICreateTransaction): Promise<ITransaction> {
    return await this.httpClient.post<ITransaction>(API_ROUTES.TASKS.CREATE, transaction)
  }

  async update(id: number, transaction: IUpdateTransaction): Promise<ITransaction> {
    return await this.httpClient.patch<ITransaction>(`${API_ROUTES.TASKS.UPDATE(id)}`, transaction)
  }

  async delete(id: number): Promise<boolean> {
    return await this.httpClient.delete<boolean>(`${API_ROUTES.TASKS.DELETE(id)}`)
  }
}
