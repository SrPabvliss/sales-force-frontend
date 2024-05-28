import { HttpHandler } from '@/core/interfaces/HttpHandler'
import { getCookie } from '@/core/utils/CookiesUtil'
import { HTTP_STATUS_CODES } from '@/core/utils/HttpStatusCodes'
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'

export class AxiosClient implements HttpHandler {
  private static instance: AxiosClient
  private axiosInstance: AxiosInstance
  private static readonly baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  private static accessToken: string | null = null

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: AxiosClient.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AxiosClient.accessToken}`,
      },
    })

    this.axiosInstance.interceptors.request.use(
      async (config) => {
        if (!AxiosClient.accessToken) {
          AxiosClient.accessToken = await getCookie('accessToken')
        }

        if (!AxiosClient.accessToken) {
          //TODO: logout
        }

        if (AxiosClient.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${AxiosClient.accessToken.replaceAll('"', '')}`
        }

        return config
      },
      (error) => Promise.reject(error),
    )

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === HTTP_STATUS_CODES.UNAUTHORIZED) {
          //TODO: logout
        }

        return Promise.reject(error)
      },
    )
  }

  public static getInstance(): AxiosClient {
    if (!this.instance) {
      this.instance = new AxiosClient()
    }
    return this.instance
  }

  public static setAccessToken(accessToken: string): void {
    this.accessToken = accessToken
    if (this.instance) {
      this.instance.axiosInstance.defaults.headers['Authorization'] = `Bearer ${accessToken}`
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(url, config)
    return response.data
  }

  async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config)
    return response.data
  }

  async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config)
    return response.data
  }

  async patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.patch(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config)
    return response.data
  }
}
