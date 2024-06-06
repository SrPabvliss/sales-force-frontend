import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { HttpHandler } from '@/core/interfaces/HttpHandler'
import { API_ROUTES } from '@/shared/api-routes/api-routes'

import { ICategory } from '../models/ICategory'

export interface CategoriesDatasource {
  getAll(): Promise<ICategory[]>
  create(category: ICategory): Promise<ICategory>
  update(id: number, category: Partial<ICategory>): Promise<ICategory>
  delete(id: number): Promise<boolean>
}

export class CategoriesDatasourceImpl implements CategoriesDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): CategoriesDatasourceImpl {
    return new CategoriesDatasourceImpl()
  }

  async getAll(): Promise<ICategory[]> {
    return await this.httpClient.get<ICategory[]>(API_ROUTES.CATEGORIES.GET)
  }

  async create(category: Omit<ICategory, 'id'>): Promise<ICategory> {
    return await this.httpClient.post<ICategory>(API_ROUTES.CATEGORIES.CREATE, category)
  }

  async update(id: number, category: Partial<ICategory>): Promise<ICategory> {
    return await this.httpClient.patch<ICategory>(API_ROUTES.CATEGORIES.UPDATE(id), category)
  }

  async delete(id: number): Promise<boolean> {
    return await this.httpClient.delete<boolean>(`${API_ROUTES.CATEGORIES.DELETE(id)}`)
  }
}
