// fetch axios, http

import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { HttpHandler } from '@/core/interfaces/HttpHandler'

import { UserAdapter } from '../adapters/UserAdapter'
import { IApiUser } from '../models/IApiUser'
import { IUser } from '../models/IUser'

// UserClass

// client HttpCLient = AxiosCLient | FetchClient

interface UserDatasource {
  fetchUser(): Promise<IUser>
}

export class UserDatasourceImpl implements UserDatasource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): UserDatasource {
    return new UserDatasourceImpl()
  }

  async fetchUser(): Promise<IUser> {
    const response = await this.httpClient.get<IApiUser>('https://pokeapi.co/api/v2/pokemon/ditto')
    return UserAdapter.toDomain(response)
  }
}
