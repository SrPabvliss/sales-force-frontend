import { AxiosClient } from '@/core/infrastructure/http/AxiosClient'
import { HttpHandler } from '@/core/interfaces/HttpHandler'
import { API_ROUTES } from '@/shared/api-routes/api-routes'

import { TaskAdapter } from '../Adapters/TaskAdapter'
import { IComment, ICreateTask, ITask, IUpdateTask } from '../models/ITask'

export interface TasksDataSource {
  getAll(): Promise<ITask[]>
  getById: (id: number) => Promise<ITask>
  getAllByEmployee(id: number): Promise<ITask[]>
  getAllByConsumer(id: number): Promise<ITask[]>
  create(delegation: ICreateTask): Promise<ITask>
  update(id: number, delegation: IUpdateTask): Promise<ITask>
  delete(id: number): Promise<boolean>
  addComment(taskId: number, comment: string): Promise<IComment>
}

export class TasksDataSourceImpl implements TasksDataSource {
  private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): TasksDataSourceImpl {
    return new TasksDataSourceImpl()
  }

  async getAll(): Promise<ITask[]> {
    const rawData = await this.httpClient.get<ITask[]>(API_ROUTES.TASKS.GET_ALL)
    return TaskAdapter.toDomainList(rawData)
  }

  async getAllByEmployee(id: number): Promise<ITask[]> {
    const rawData = await this.httpClient.get<ITask[]>(API_ROUTES.TASKS.GET_BY_EMPLOYEE(id))
    return TaskAdapter.toDomainList(rawData)
  }

  async getAllByConsumer(id: number): Promise<ITask[]> {
    const rawData = await this.httpClient.get<ITask[]>(API_ROUTES.TASKS.GET_BY_CONSUMER(id))
    return TaskAdapter.toDomainList(rawData)
  }

  async getById(id: number): Promise<ITask> {
    const rawData = await this.httpClient.get<ITask>(API_ROUTES.TASKS.GET_BY_ID(id))
    return TaskAdapter.toDomain(rawData)
  }

  async create(delegation: ICreateTask): Promise<ITask> {
    const rawData = await this.httpClient.post<ITask>(API_ROUTES.TASKS.CREATE, delegation)
    return TaskAdapter.toDomain(rawData)
  }

  async update(id: number, delegation: IUpdateTask): Promise<ITask> {
    const rawData = await this.httpClient.patch<ITask>(`${API_ROUTES.TASKS.UPDATE(id)}`, delegation)
    return TaskAdapter.toDomain(rawData)
  }

  async delete(id: number): Promise<boolean> {
    return await this.httpClient.delete<boolean>(`${API_ROUTES.TASKS.DELETE(id)}`)
  }

  async addComment(taskId: number, comment: string): Promise<IComment> {
    return await this.httpClient.post<IComment>(API_ROUTES.TASKS.ADD_COMMENT(taskId), { comment })
  }
}
