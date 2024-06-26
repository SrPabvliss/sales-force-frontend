import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { HttpHandler } from '@/core/interfaces/HttpHandler'
import { setCookie } from '@/core/utils/CookiesUtil'
import { ACCESS_TOKEN_COOKIE_NAME, API_ROUTES } from '@/shared/api-routes/api-routes'
import { IApiModule } from '@/shared/interfaces/IModule'

import { UserAdapter } from '../adapters/UserAdapter'
import { IApiUser } from '../models/IApiUser'
import { IAuth, IUser } from '../models/IUser'

interface UserDatasource {
  login(credentials: IAuth): Promise<IUser>
  getAccessModules(id: number): Promise<number[]>
}

export class UserDatasourceImpl implements UserDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): UserDatasource {
    return new UserDatasourceImpl()
  }

  async login(credentials: IAuth): Promise<IUser> {
    const data = await this.httpClient.post<IApiUser>(API_ROUTES.AUTH.LOGIN, credentials)
    data.token && (await setCookie(ACCESS_TOKEN_COOKIE_NAME, data.token))
    return UserAdapter.toDomain(data)
  }

  async getAccessModules(id: number): Promise<number[]> {
    const rawData = await this.httpClient.get<IApiModule[]>(API_ROUTES.AUTH.GET_ACCESS_MODULES(id))
    return rawData.map((module) => module.id)
  }
}
