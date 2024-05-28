// infrastructure/http/FetchClient.ts
import { HttpHandler } from '@/core/interfaces/HttpHandler'

export class FetchClient implements HttpHandler {
  private static instance: FetchClient
  private static readonly baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  private static accessToken: string = ''

  private constructor() {}

  public static getInstance(): FetchClient {
    if (!this.instance) {
      this.instance = new FetchClient()
    }
    return this.instance
  }

  public static setAccessToken(accessToken: string): void {
    this.accessToken = accessToken
  }

  private getHeaders(headers?: HeadersInit): HeadersInit {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${FetchClient.accessToken}`,
      ...headers,
    }
  }

  async get<T>(url: string, config?: RequestInit): Promise<T> {
    const response = await fetch(`${FetchClient.baseUrl}${url}`, {
      ...config,
      method: 'GET',
      headers: this.getHeaders(config?.headers),
    })
    return this.handleResponse<T>(response)
  }

  async post<T>(url: string, data: any, config?: RequestInit): Promise<T> {
    const response = await fetch(`${FetchClient.baseUrl}${url}`, {
      ...config,
      method: 'POST',
      headers: this.getHeaders(config?.headers),
      body: JSON.stringify(data),
    })
    return this.handleResponse<T>(response)
  }

  async put<T>(url: string, data: any, config?: RequestInit): Promise<T> {
    const response = await fetch(`${FetchClient.baseUrl}${url}`, {
      ...config,
      method: 'PUT',
      headers: this.getHeaders(config?.headers),
      body: JSON.stringify(data),
    })
    return this.handleResponse<T>(response)
  }

  async patch<T>(url: string, data: any, config?: RequestInit): Promise<T> {
    const response = await fetch(`${FetchClient.baseUrl}${url}`, {
      ...config,
      method: 'PATCH',
      headers: this.getHeaders(config?.headers),
      body: JSON.stringify(data),
    })
    return this.handleResponse<T>(response)
  }

  async delete<T>(url: string, config?: RequestInit): Promise<T> {
    const response = await fetch(`${FetchClient.baseUrl}${url}`, {
      ...config,
      method: 'DELETE',
      headers: this.getHeaders(config?.headers),
    })
    return this.handleResponse<T>(response)
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return response.json() as Promise<T>
  }
}
